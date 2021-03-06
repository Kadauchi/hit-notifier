import React, { useState } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

import PandaButtons from '../components/PandaButtons';

import { getPostedAtOn } from '../functions';

function Previous({ hits }) {
  const [expanded, setExpanded] = useState(null);

  function handleChange(id) {
    setExpanded(expanded !== id ? id : null);
  }

  return hits.length ? (
    <>
      {hits.map((hit) => (
        <ExpansionPanel key={hit.id} expanded={expanded === hit.id} onChange={() => handleChange(hit.id)}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            {hit.isMasters && <Chip color="secondary" label="Masters" />}
            {hit.isUsOnly && <Chip color="secondary" label="US Only" />}
            <Typography>{getPostedAtOn(hit)}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PandaButtons hit={hit} />
            <Typography component="div">{renderHTML(hit.html)}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  ) : null;
}

function mapStateToProps(state) {
  return {
    hits: state.hits.filter((hit) => !hit.filter),
  };
}

export default connect(
  mapStateToProps,
  null,
)(Previous);
