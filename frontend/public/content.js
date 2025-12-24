function getProblemTitle() {

    const parts=window.location.pathname.split('/');
    const slug=parts[2];
    
    if(!slug) return null;

    const title=slug.
    split('-')
    .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(' ');

    return {title,slug};

}

const problem=getProblemFromURL();
if (problem) {
  chrome.runtime.sendMessage({
    type: "PROBLEM_FOUND",
    ...problem
  });
}