import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Stage, Layer, Line } from 'react-konva';

import { dataURItoBlob } from '../utils/common';
import requireAuth from '../components/hocs/requireAuth';
import { fetchDrawings, uploadDrawings } from '../actions';

const DrawingPage = (props) => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleExport = async () => {
    const uri = stageRef.current.toDataURL();
    const imageBlob = dataURItoBlob(uri);
    const imageFile = new File([imageBlob], `drawing-${Math.random().toString(36).substring(7)}.png`, {
      type: 'image/png',
    });
    const form = new FormData();
    form.append('image', imageFile);
    props.actions.uploadDrawings(form);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const head = () => {
    return (
      <Helmet>
        <title>{`${props.drawings.length} Drawings`}</title>
        <meta property="og:title" content="Drawing Canvas" />
      </Helmet>
    );
  }

  return (
    <div>
      {head()}
      <Stage
        ref={stageRef}
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={line.tool === 'eraser' ? 50 : 5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleExport}>Click here to log stage data URL</button>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchDrawings, uploadDrawings }, dispatch)
});

function mapStateToProps({ drawings }) {
  return { drawings };
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(
    requireAuth(DrawingPage)
  ),
  loadData: ({ dispatch }) => dispatch(fetchDrawings())
};
