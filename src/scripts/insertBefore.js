export const insertBefore = (parent, child, before) => {
    if (!!parent && !!child) {
      document
        .querySelector(parent)
        .insertBefore(
          child.nodeType != 1 ? document.querySelector(child) : child,
          document.querySelector(before)
        );
    } else {
      if (!!!parent) {
        console.log("Element 'parent' not specified");
      }
      if (!!!child) {
        console.log("Element 'child' not specified");
      }
    }
  };