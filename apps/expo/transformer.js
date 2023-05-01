const babelTransformer = require("metro-react-native-babel-transformer");
const fs = require("fs");
const path = require("path");

module.exports.transform = ({ src, filename, options }) => {
  // console.log(filename);
  if (
    filename.includes(".glsl") ||
    filename.includes(".vert") ||
    filename.includes(".frag")
  ) {
    /** Returns the list of included files */
    function parseIncludes(src) {
      const includeRegex = /\#include\s+(.*)/g;
      // if the include is a THREE.JS directive, ignore it
      const ignoreRegex = /\#include\s+<(.*)>/g;
      // ignore if it's a comment
      const commentRegex = /\/\/(.*)/g;

      const includes = [];
      let match;
      while ((match = includeRegex.exec(src))) {
        if (!ignoreRegex.test(match[0]) && !commentRegex.test(match[0])) {
          includes.push(match[1]);
        }
      }
      return includes;
    }

    /** Returns the source code of the included file */
    function getIncludeSource(include) {
      // remove double and single quotes
      let relPath = include.replace(/['"]/g, "");

      // add default .glsl extension if none is provided
      if (!path.extname(relPath)) {
        relPath += ".glsl";
      }
      // relative to the "filename" path
      const includePath = path.join(path.dirname(filename), relPath);
      return fs.readFileSync(includePath, "utf8");
    }

    
    /** Returns the source code of the shader with all includes resolved */
    function resolveIncludesRecursive(src, depth = 0) {
      const includes = parseIncludes(src);
      if (includes.length === 0 || depth < 0) {
        return src;
      }

      let result = src;
      includes.forEach((include) => {
        const includeSource = getIncludeSource(include);
        const includeResolved = resolveIncludesRecursive(includeSource, depth - 1);
        result = result.replace(`#include ${include}`, includeResolved);
      });

      return result;
    }
    let maxDepth = 10;
    const resolvedSrc = resolveIncludesRecursive(src, maxDepth);
    return babelTransformer.transform({
      src: `let source = \`${resolvedSrc}\`; export default source;`,
      filename,
      options,
    });
  }
  return babelTransformer.transform({ src, filename, options });
};
