import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer } from "react-konva";
import URLImage from "./URLImage";
// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded

function pointerStart({ event }) {
  // Ok, you touched the screen or clicked, now things can move until you stop doing that
  // Check if this is a touch event
  if (event && event.type && event.type === "touchstart") {
    // set initial touch position to the coordinates where you first touched the screen
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
    // Check if this is a mouse click event
  } else if (event && event.type && event.type === "mousedown") {
    // set initial mouse position to the coordinates where you first clicked
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
}

function endGesture() {
  return { x: 0, y: 0 };
}

function pointerMove({ event, pointer_initial = { x: 0, y: 0 } }) {
  var current_x = 0;
  var current_y = 0;
  // Check if this is a touch event
  if (event && event.type && event.type === "touchmove") {
    // Current position of touch
    current_x = event.touches[0].clientX;
    current_y = event.touches[0].clientY;
    // Check if this is a mouse event
  } else if (event && event.type && event.type === "mousemove") {
    // Current position of mouse cursor
    current_x = event.clientX;
    current_y = event.clientY;
  }

  // Set pointer position to the difference between current position and initial position
  return {
    x: current_x - pointer_initial.x,
    y: current_y - pointer_initial.y
  };
}

function calculateRotate({
  pointer = { x: 0, y: 0 },
  motion = { x: 0, y: 0 }
}) {
  return {
    x: pointer.y * -0.15 + motion.y * 1.2,
    y: pointer.x * 0.15 + motion.x * 1.2
  };
}

class App extends Component {
  state = {
    moving: false,
    motion: {
      x: 0,
      y: 0
    },
    transform: {
      x: 0,
      y: 0
    },
    offset_initial: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 0
    },
    pointer: {
      x: 0,
      y: 0
    },
    pointer_initial: {
      x: 0,
      y: 0
    }
  };

  handleOnStart = e => {
    this.setState({
      moving: true,
      pointer_initial: pointerStart({ event: e })
    });
  };

  pointerMove = ({
    event,
    moving,
    pointer,
    motion,
    pointer_initial = { x: 0, y: 0 }
  }) => {
    var current_x = 0;
    var current_y = 0;
    // Check if this is a touch event
    if (event && event.type && event.type === "touchmove") {
      // Current position of touch
      current_x = event.touches[0].clientX;
      current_y = event.touches[0].clientY;
      // Check if this is a mouse event
    } else if (event && event.type && event.type === "mousemove") {
      // Current position of mouse cursor
      current_x = event.clientX;
      current_y = event.clientY;
    }

    // Set pointer position to the difference between current position and initial position
    if (moving === true) {
      this.setState({
        pointer: {
          x: current_x - pointer_initial.x,
          y: current_y - pointer_initial.y
        },
        transform: calculateRotate({
          pointer,
          motion
        })
      });
    }
  };

  handleOnEnd = e => {
    this.setState(
      {
        moving: false,
        pointer: endGesture()
      },
      () =>
        this.setState({
          transform: calculateRotate({
            pointer: this.state.pointer,
            motion: this.state.motion
          })
        })
    );
  };

  handleMove = e => {
    if (this.waiting) {
      return;
    }
    e.persist();
    this.waiting = true;
    requestAnimationFrame(() => {
      this.waiting = false;
      this.pointerMove({
        event: e,
        moving: this.state.moving,
        pointer: this.state.pointer,
        motion: this.state.motion
      });
    });
  };

  render() {
    return (
      <div
        className="image-container"
        onMouseDown={this.handleOnStart}
        onTouchSart={this.handleOnStart}
        onMouseMove={this.handleMove}
        onTouchMove={this.handleMove}
        onMouseUp={this.handleOnEnd}
        onTouchEnd={this.handleOnEnd}
      >
        <div
          className="canvas"
          id="canvas"
          style={{
            transform: `rotateX(${this.state.transform.x}deg) rotateY(${
              this.state.transform.y
            }deg)`
          }}
        >
          <Stage width={900} height={1200}>
            <Layer globalCompositeOperation>
              <URLImage
                src="https://i.ibb.co/QFV8C5D/layer-1-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                z_index={-2.25}
              />
              <URLImage
                src="https://i.ibb.co/HHPjHpw/layer-2-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                z_index={-2}
              />
              <URLImage
                src="https://i.ibb.co/HKFnC0s/layer-3-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                blend="overlay"
                z_index={-1.25}
              />
              <URLImage
                src="https://i.ibb.co/T062RsN/layer-4-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                blend="overlay"
                z_index={-0.5}
              />
              <URLImage
                src="https://i.ibb.co/HqCMBLD/layer-5-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                opacity={0.75}
                blend="multiply"
                z_index={-1.25}
              />
              <URLImage
                src="https://i.ibb.co/wMHx5PF/layer-6-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                z_index={0}
              />
              <URLImage
                src="https://i.ibb.co/j3676FP/layer-7-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                z_index={0.8}
                opacity={1}
              />
              <URLImage
                src="https://i.ibb.co/fDTGgvq/layer-8-1.png"
                pointer={this.state.pointer}
                motion={this.state.motion}
                x={0}
                y={0}
                opacity={0.9}
                z_index={2}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

// Listen to any time you move your finger in the canvas element
document
  .getElementById("canvas")
  .addEventListener("touchmove", function(event) {
    // Don't scroll the screen
    event.preventDefault();
  });

// Listen to any time you move your finger in the canvas element
document
  .getElementById("canvas")
  .addEventListener("mousemove", function(event) {
    // Don't scroll the screen
    event.preventDefault();
  });
