class App extends PyriteElement {
    style = {
      fontFamily: 'arial'
    };

    constructor() {
        super('div');
        pyrite.initialize(this)
          .withStyles(this.style)
          .withChildren([ new Presentation() ]);
    }
}
  
let app = new App();