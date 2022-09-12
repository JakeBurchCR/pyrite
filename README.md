# Pyrite

### Examples

Pyrite provides a framework for managing the DOM via Javascript. 

Example:

In HTML
```html
<div class="container">
  <h1 style="color: blue;">Hello</h1>
  <p>Thanks for looking at Pyrite!</p>
  <button type="button" onclick="alert('thanks lol')">Click me!</button>
</div>
```

With Pyrite:
```js
const styles = {
  h1: {
    color: 'blue'
  }
};

pyrite.element('div')
  .withClasses(['container'])
  .withChildren([
    pyrite.element('h1')
      .withStyles(styles.h1)
      .withText('Hello'),
    pyrite.element('p').withText('Thanks for looking at Pyrite!'),
    pyrite.element('button')
      .withProps({ type: 'button' })
      .withClickEffect(() => alert('thanks lol'))
      .withText('Click me!')
  ]);
```

In this example, the Pyrite version is much more verbose. But in a scenario like this:
```html
<ul>
  <li onclick="alert('Wake up')">Wake up</li>
  <li onclick="alert('Grab a brush and put a little makeup')">Grab a brush and put a little makeup</li>
  <li onclick="alert('Hide the scars to fade away the shakeup')">Hide the scars to fade away the shakeup</li>
  <li onclick="alert('Why'd you leave the keys upon the table?')">Why'd you leave the keys upon the table?</li>
  <li onclick="alert('Here you go create another fable')">Here you go create another fable</li>
</ul>
```

Pyrite gives us a tidy method of adding repeated content to the DOM:
```ts
const phrases = [
  'Wake up',
  'Grab a brush and put a little makeup',
  'Hide the scars to fade away the shakeup',
  'Why\'d you leave the keys upon the table?',
  'Here you go create another fable'
];

pyrite.element('ul')
  .withChildren(
    phrases.map(phrase => pyrite.element('li').wihText(phrase).withClickEffect(() => alert(phrase))
  );
```

Pyrite is meant to be used as a single entry point, single page application framework, but you can use Pyrite anywhere you find it useful. For example:
```html
<body>
  <h1>An interesting title</h1>
  <p>Four score and seven years ago, a guy did a thing. Big mistake.</p>
  <img src="rabid-badger.jpg" />
  <iframe href="much.better.website.com"></iframe>
  <p>My favorite cereals</p>
  <ul>
    <li>The kind with loops</li>
    <li>The kind with bunches of oats</li>
    <li>Chocolate Vampire</li>
    <li>Total</li>
  </ul>
</body>
```

Maybe you have a simple, static DOM structure, and you don't really benefit from describing it with JS. Except you decide you want to pull your favorite cereals from a database.

With Pyrite, we can not only programmatically build DOM structure fragments, but also watch for changes to the backing property and live-rebuild accordingly:

```ts
ul = pyrite.element('ul');
document.body.appendChild(ul.native);

// ...

detectChanges(prop, target) {
  if (prop === 'cereals') {
    buildFavoriteCereals();
  }
}

buildFavoriteCereals() {
  this.ul.clearChildren();
  this.ul.withChildren( 
    this.cereals.map(cereal => new pyrite.element('li').withText(cereal));
  );
}
```

### Usage

Some day this will be an importable module, but for now:

```
yarn add @jakeburch/pyrite
```
```html
<script src="node_modules/@jakeburch/pyrite/index.js" type="text/javascript"></script>
```

### Thanks

I made Pyrite for fun. It should not be considered practical, stable, or even useful for actual products.
