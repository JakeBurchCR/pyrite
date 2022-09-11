class Pyrite {
    initialize(app) {
      document.body.appendChild(app.native);
      return app;
    }
    
    element(tagName) {
        return new PyriteElement(tagName);
    }
  }
  
  const pyrite = new Pyrite();
  
  class PyriteElement {
    native;
    styles;
    output;
    id;
    children;
  
    constructor(tagName) {
      this.native = document.createElement(tagName);
      this.setId(tagName);
      return new Proxy(this, {
        get: (target, prop) => {
            setTimeout(() => {
                this.detectChildrenChanges(prop);
                target.detectChanges(prop);
            });
            return target[prop];
          }
      });
    }
  
    setId(tagName) {
        let guid = '';
        let id = '';
        for (let i = 0; i < 4; i++) {
          guid += Math.floor(1000 + Math.random() * 9000) + (i === 3 ? '' : '-');
        }
        id = `${tagName}-${guid}`;
        this.id = id;
        this.native.id = id;
    }
  
    withText(text) {
      this.native.innerText = text;
      return this;
    }
  
    withStyles(styles) {
      if (!styles) return this;
      Object.keys(styles).forEach(style => this.native.style[style] = styles[style]);
      return this;
    }
  
    withChildren(childElements) {
      childElements.forEach(element => this.native.appendChild(element.native));
      return this;
    }
  
    withClasses(classes) {
      classes.forEach(klass => this.native.classList.add(klass));
      return this;
    }
  
    withClickEffect(callback) {
      this.native.onclick = callback;
      return this;
    }
  
    withProps(props) {
      if (!props) return this;
      Object.keys(props).forEach(prop => this.native[prop] = props[prop]);
      return this;
    }
  
    clearChildren() {
      this.native.innerHTML = '';
      return this;
    }

    detectChildrenChanges(prop) {
        if (prop === 'children') {
            this.clearChildren();
            this.withChildren(this.children);
        }
    }
  
    detectChanges(prop, target) {
        // add global detection logic here
    }
  }

