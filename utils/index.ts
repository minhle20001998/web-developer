export const mergeClassnames = (...classnames: (string | undefined)[]) => {
  return classnames.filter(Boolean).join(' ');
}