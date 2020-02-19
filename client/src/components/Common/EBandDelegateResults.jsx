import React, { useState } from 'react';
import { useSubscription } from 'react-apollo';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import { CountryResults } from './CountryResults.jsx';
import '../../styling/EBandDelegateResults.css';
import { UPDATE_VOTE } from '../../subscriptions';
import '../../styling/Chart.css';

const ResultPage = props => {
  const getNavbar = () => {
    return <Navbar />;
  };
  const { location } = props;
  const countYesInit = location.state.data;
  const [countYes, setCountYes] = useState(countYesInit || 0);
  const [chartData, setChartData] = useState({
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        data: [countYes, 0],
        backgroundColor: ['rgba(246,219,166,0.8)', 'rgba(246,219,166,0.7)'],
      },
    ],
  });
  const dataResult = {
    datasets: [
      {
        data: [countYes, 0],
        backgroundColor: ['#ED8C2B', '#88A825'],
        hoverBackgroundColor: ['#ED8C2B', '#88A825'],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Yes', 'No'],
  };
  const { data } = useSubscription(UPDATE_VOTE, {
    onSubscriptionData: options => {
      setCountYes(options.subscriptionData.data.voteUpdate.countYes);
      setChartData(
        Object.assign(chartData, {
          datasets: [
            {
              label: 'Votes',
              data: [options.subscriptionData.data.voteUpdate.countYes, 0],
              backgroundColor: [
                'rgba(246,219,166,0.8)',
                'rgba(246,219,166,0.7)',
              ],
            },
          ],
        })
      );
    },
  });

  return (
    <div className="Main">
      {getNavbar()}
      <p id="heading">RESULTS </p>
      <div className="parts">
        <div className="part1">
          <div className="result">
            <div className="chart box">
              {/* <Doughnut
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: true,
                    labels: { fontColor: '#ffffff', fontSize: 20 },
                  },
                  layout: {
                    padding: {
                      bottom: 50,
                    },
                  },
                }}
              /> */}
              <Pie data={dataResult} />
            </div>
            {data ? data.voteUpdate.countYes : 1}
          </div>
        </div>
        <div className="part2">
          <div className="country">
            <CountryResults />
          </div>
        </div>
      </div>
    </div>
  );
};

ResultPage.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ResultPage;
