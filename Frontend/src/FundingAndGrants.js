import React from 'react';
import FundingOpportunities from './FundingOpportunities';
import GrantResources from './GrantResources';
import ApplicationStatusTracker from './ApplicationStatusTracker';

const FundingAndGrants = () => {
  return (
    <div className="funding-and-grants container-custom">
      <h1>Funding and Grants</h1>
      <br></br>
      <FundingOpportunities />
      <br></br>
      <GrantResources />
      <br></br>
      <ApplicationStatusTracker />
    </div>
  );
};

export default FundingAndGrants;
