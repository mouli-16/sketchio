# **MODULE 3**

# **Draw Component**

> Now, whenever we think of skribbl, the first word thought that strikes our mind is DRAWING, thus let’s start creating our very own draw component.
> As we all know components are a crucial part of ReactJs which literally makes our lives easier. Thus let’s start by creating a component dedicated to our BOARD for the draw area as in the drawing board which will contain all the logics namely,

- Drawing on paint app function

- Mouse Capturing logic

- Socket logics
  So start by creating an independent component say  ```’board.jsx’```Now to be specific this component contains only the logic and renders just the ```<canvas>``` element.

  

  

  ## **THE CANVAS ELEMENT**

  > A canvas is a single DOM element that encapsulates a picture. It provides a programming interface for drawing shapes onto the space taken up by the node.It converts the shapes to pixels (colored dots on a raster) as soon as they are drawn and does not remember what these pixels represent. Canvas graphics can be drawn onto a ```<canvas>``` element.

  > You can give such an element ```width and height``` attributes to determine its size in pixels.Now, a new canvas is empty, meaning it is entirely transparent and thus shows up as empty space in the document.The ```<canvas>``` tag is intended to allow different styles of drawing. To get access to an actual drawing interface, we first need to create a *context*, an object whose methods provide the drawing interface. There are currently two widely supported drawing styles: "2d" for two-dimensional graphics and "webgl" for three-dimensional graphics through the OpenGL interface.

  **Here,we’ll stick to two dimensions.**

  You create a context with the getContext method on the ```<canvas> ```DOM element.So start with the draw on canvas function;

  ```var canvas = document.querySelector("#Board");```

  ```this.ctx = canvas.getContext("2d");```

  ```var ctx = this.ctx;```