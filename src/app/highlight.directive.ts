import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {

  @Input() highlight: string;
  private START_WRAPPER: string = '==##==##==##==';
  private END_WRAPPER: string = '--##--##--##--';

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.highlight) {
      this.cleanPreviousmark(this.el.nativeElement);
      this.markText(this.el.nativeElement);
    } else {
      this.cleanPreviousmark(this.el.nativeElement);
    }
  }

  private markText(htmlElement: HTMLElement) {
    if (htmlElement.innerHTML) {
      this.traverseAllChidrens(htmlElement);
    }
    this.replaceWrappers(htmlElement);
  }

  private markMatchedText(node: Node) {
    let content = node.nodeValue;
    content = content.replace(new RegExp(this.filterSearch(), 'gmi'), this.START_WRAPPER + '$&' + this.END_WRAPPER);
    node.nodeValue = content;
  }

  private replaceWrappers(htmlElement: HTMLElement) {
    if (htmlElement.innerHTML) {
      let innerHtml = htmlElement.innerHTML;
      innerHtml = innerHtml.replace(new RegExp(this.START_WRAPPER, 'gmi'), '<mark>');
      innerHtml = innerHtml.replace(new RegExp(this.END_WRAPPER, 'gmi'), '</mark>');
      htmlElement.innerHTML = innerHtml;
    }
  }

  private traverseAllChidrens(htmlElement: HTMLElement) {
    this.traverseAllTextNodes(htmlElement.childNodes);
    for (let i = 0; i < htmlElement.children.length; i++) {
      this.markText(<HTMLElement>htmlElement.children[i]);
    }
  }

  private traverseAllTextNodes(nodes: NodeList) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === 3) {
        this.markMatchedText(nodes[i]);
      }
    }
  }

  private cleanPreviousmark(htmlElement: HTMLElement) {
    if (htmlElement.innerHTML) {
      let innerHtml = htmlElement.innerHTML;
      innerHtml = innerHtml.replace(new RegExp('<mark>|</mark>', 'gmi'), '');
      htmlElement.innerHTML = innerHtml;
    }
  }

  private filterSearch() {
    let filteredSearch = this.highlight.replace(/\\/g,'|');
    filteredSearch = filteredSearch.replace(/\*/g,'\\*');
    filteredSearch = filteredSearch.replace(new RegExp('[\[\]\\\-\=\\+\*\/\?\<\>\.\^]', 'gm'), '\\$&');
    return filteredSearch.trim();
  }

}
