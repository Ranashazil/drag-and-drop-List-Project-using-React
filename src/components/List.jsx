import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors,
      dragging: false, // State to check if an item is being dragged
      draggedIndex: null, // Index of the currently dragged item
    };
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    this.setState({ 
      dragging: true,
      draggedIndex: Number(this.dragged.dataset.id), // Store index of the dragged item
    });
    e.dataTransfer.effectAllowed = 'move';
  }

  dragEnd(e) {
    const { colors, draggedIndex } = this.state;

    // Reset state and set dragged index
    this.setState({ 
      dragging: false,
      draggedIndex: null 
    });

    const from = draggedIndex;
    const to = Number(this.over.dataset.id);

    if (from !== to) {
      // Move item only if the index has changed
      const updatedColors = [...colors];
      const [movedItem] = updatedColors.splice(from, 1); // Remove dragged item
      updatedColors.splice(to, 0, movedItem); // Insert it at the new index
      this.setState({ colors: updatedColors });
    }

    this.over = null;
  }

  dragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
    this.over = e.currentTarget; // Set over to the current target
  }

  render() {
    const { colors, dragging, draggedIndex } = this.state;

    return (
      <div className="p-6">
        <ul className="space-y-2 border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-inner">
          {colors.map((color, i) => {
            const isDragged = draggedIndex === i;

            return (
              <li
                className={`relative bg-${color.toLowerCase()}-500 text-white p-4 m-2 rounded-lg shadow-lg cursor-move capitalize font-semibold transform transition duration-200 hover:scale-105 hover:shadow-2xl`}
                style={{backgroundColor: color}}
                data-id={i}
                key={i}
                draggable="true"
                onDragStart={this.dragStart.bind(this)}
                onDragEnd={this.dragEnd.bind(this)}
                onDragOver={this.dragOver.bind(this)}
              >
                {isDragged ? null : color} {/* Hide the color name when dragged */}
                {dragging && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 border border-dashed border-blue-400 text-blue-500 h-full rounded-lg">
                    Drop Here
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List;
