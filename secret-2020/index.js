function imageHover(element) {
    var currSrc = element.src; 
    const path = currSrc.indexOf('assets')
    const dotPos = currSrc.indexOf('.', path)
    var newSrc = currSrc.substring(path, dotPos) + "Hover.png" 
    console.log(newSrc)
    element.setAttribute('src', newSrc)
}

function imageHoverOut(element) {
    var currSrc = element.src; 
    const cutOut = currSrc.indexOf('Hover')
    var newSrc = currSrc.substring(0, cutOut) + currSrc.substring(cutOut + 5);
    element.setAttribute('src', newSrc)
}

// scroll horizontally on vertical scroll
var contentContainer;
function replaceVerticalScrollByHorizontal(event) {
    if (event.deltaY != 0) {
      // manually scroll horizonally instead
        contentContainer.scroll(contentContainer.scrollLeft + event.deltaY , 0);
        // prevent vertical scroll
        event.preventDefault();
    }
    return;
}
window.addEventListener('wheel', replaceVerticalScrollByHorizontal, {passive: false});

document.addEventListener("DOMContentLoaded", function(event) {
    // move hack tx title into view if it is cut off
    const titleRect = document.querySelector('#hacktxtitle').getBoundingClientRect();
    contentContainer = document.querySelector('#superContentContainer');
    const contentRect = contentContainer.getBoundingClientRect()
    if (titleRect.right > contentRect.right) {
        const contentMid = (contentRect.width) / 2.0;
        const titleMid = titleRect.left + (titleRect.width / 2.0);
        contentContainer.scrollLeft = (titleMid - contentMid);
    }
    
});
