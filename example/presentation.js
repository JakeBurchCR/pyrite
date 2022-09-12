const styleConfigs = {
  defaultControlPadding: '10px 13px'
}

const globalStyles = {
  button: (color, background) => {
    return {
      background,
      color,
      border: 'none',
      borderRadius: '3px',
      outline: 'none',
      padding: styleConfigs.defaultControlPadding,
      cursor: 'pointer'
    };
  },
  input: {
    padding: styleConfigs.defaultControlPadding
  }
};

class Presentation extends PyriteElement {
  styles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    margin: '20px',
    border: '1px solid #f2f2f2',
    borderRadius: '3px',
    background: 'white'
  };

  children = [
    new PresentationTitle(),
    pyrite.element('p')
      .withText('Here is a simple to-do app built with Pyrite.')
      .withClasses(['message'])
      .withStyleSheet('message.css'),
    new AddToDoSection(text => this.addToDo(text))
  ];

  constructor() {
    super('div').withStyles(this.styles);
    this.withChildren(this.children);
  }

  addToDo(text) {
    this.children = [...this.children, new ToDo(text, false, id => this.removeToDo(id))];
  }

  removeToDo(id) {
    this.children = this.children.filter(child => child.id !== id);
  }
}

class PresentationTitle extends PyriteElement {
  styles = {
    fontFamily: 'arial',
    fontSize: '28px'
  };

  constructor() {
    super('h1')
      .withStyles(this.styles)
      .withText('Pyrite Example')
  }
}

class ToDo extends PyriteElement {
  styles = {
    todo: {
      flex: '1',
      background: '#f67280',
      color: 'white',
      padding: '20px',
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '3px'
    },
    todoConrols: {
      display: 'flex'
    }
  }

  text;
  isDone;

  constructor(text, isDone, removeToDo) {
    super('div').withStyles(this.styles.todo).withClickEffect(() => this.toggleDoneState());
    this.text = text;
    this.isDone = isDone;
    this.initChildren(removeToDo);
    this.removeToDo = removeToDo;
  }

  initChildren() {
    this.clearChildren();
    this.withChildren([
      pyrite.element('div').withChildren([
        pyrite.element('p').withText(this.isDone ? '[x]' : '[ ]'),
        pyrite.element('p').withText(this.text).withStyles({ paddingLeft: '10px' }),
      ]).withStyles(this.styles.todoConrols),
      pyrite.element('p')
        .withText('REMOVE')
        .withClickEffect(() => this.removeToDo(this.id))
        .withStyles(globalStyles.button('#f67280', 'white'))
    ]);
  }

  remove() {
    const id = this.id;
    this.removeToDo(id);
  }

  toggleDoneState() {
    this.isDone = !this.isDone;
    this.initChildren();
  }
}

class AddToDoSection extends PyriteElement {
  input = pyrite.element('input')
    .withProps({
      type: 'text'
    }).withStyles(globalStyles.input);

  constructor(output) {
    super('div')
      .withChildren([
        this.input,
        pyrite.element('button')
          .withProps({
            type: 'button'
          })
          .withText('Add ToDo')
          .withClickEffect(() => this.add())
          .withStyles(globalStyles.button('white', 'blue'))
          .withStyles({ marginLeft: '10px'} )
      ]);

    this.output = output;
  }

  add() {
    const input = this.input.native;
    this.output(input.value);
    input.value = '';
  }
}