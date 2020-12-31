import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Stage, Layer, Line } from 'react-konva';
import withStyles from 'isomorphic-style-loader/withStyles'

import s from './DrawingPage.css';
import { dataURItoBlob } from '../utils/common';
import requireAuth from '../components/hocs/requireAuth';
import { fetchDrawings, uploadDrawings } from '../actions';

const DrawingPage = (props,context) => {
  const drawRef = React.useRef(null);
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [boardSize, setBoardSize] = React.useState({ width: 500, height: 500 });
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    setBoardSize({
      width: drawRef.current.clientWidth, height: drawRef.current.clientHeight
    });
    props.actions.fetchDrawings();
  }, []);

  const renderDrawings = () => {
    return props.drawings.map(drawing => {
      return <li key={drawing._id} onClick={() => window.open(drawing.drawingUrl,'_blank')}>{drawing.drawingUrl}</li>;
    });
  }

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

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleExport = async () => {
    const uri = stageRef.current.toDataURL();
    const imageBlob = dataURItoBlob(uri);
    const imageFile = new File([imageBlob], `drawing-${Math.random().toString(36).substring(7)}.png`, {
      type: 'image/png',
    });
    const form = new FormData();
    form.append('image', imageFile);
    setUploading(true);
    props.actions.uploadDrawings(form).then(_ => setUploading(false));
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
    <div className="row draw-container">
      {head()}
      <div className="col m6 s12 draw-container-listing">
        <h4>Snapshot listing:</h4>
        <ol>
          {renderDrawings()}
        </ol>
      </div>
      <div className={`col m6 s12 draw-container-draw-area${uploading ? ' disabled-area' : ''}`} ref={drawRef}>
        <div className="draw-container-actions">
          <button className="capture-image" onClick={handleExport}>Take SnapShot</button>
          <select
            className="select-tool"
            value={tool}
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <option key="pen" value="pen">Pen</option>
            <option key="eraser" value="eraser">Eraser</option>
          </select>
        </div>
        <Stage
          ref={stageRef}
          {...boardSize}
          className="draw-container-canvas-area"
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
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
      </div>
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
    requireAuth(withStyles(s)(DrawingPage))
  ),
  loadData: ({ dispatch }) => dispatch(fetchDrawings())
};
