import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';

function getOffset({
  z_index = 1,
  pointer = { x: 0, y: 0 },
  motion = { x: 0, y: 0 },
}) {
  // Calculate the amount you want the layers to move based on touch or mouse input.
  // You can play with the touch_multiplier variable here. Depending on the size of your canvas you may want to turn it up or down.
  var touch_multiplier = 0.3;
  var touch_offset_x = pointer.x * z_index * touch_multiplier;
  var touch_offset_y = pointer.y * z_index * touch_multiplier;

  // Calculate the amount you want the layers to move based on the gyroscope
  // You can play with the motion_multiplier variable here. Depending on the size of your canvas you may want to turn it up or down.
  var motion_multiplier = 2.5;
  var motion_offset_x = motion.x * z_index * motion_multiplier;
  var motion_offset_y = motion.y * z_index * motion_multiplier;

  // Calculate the total offset for both X and Y
  // Total offset is a combination of touch and motion
  var offset = {
    x: touch_offset_x + motion_offset_x,
    y: touch_offset_y + motion_offset_y,
  };

  // Return the calculated offset to whatever requested it.
  return offset;
}

class URLImage extends React.Component {
  ///https://konvajs.org/docs/react/Simple_Animations.html
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  render() {
    const position = getOffset({
      z_index: this.props.z_index,
      pointer: this.props.pointer,
      motion: this.props.motion,
    });
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        opacity={this.props.opacity ? this.props.opacity : 1}
        image={this.state.image}
        globalCompositeOperation={
          this.props.blend ? this.props.blend : 'normal'
        }
        position={position}
        z_index={this.props.z_index ? this.props.z_index : 1}
        ref={node => {
          this.imageNode = node;
        }}
        transformsEnabled="position"
      />
    );
  }
}

export default URLImage;
