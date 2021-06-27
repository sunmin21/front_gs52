import React from "react";

function Calendar() {
  const dateArray = ["일", "월", "화", "수", "목", "금", "토"];

  const mapArrayToDate = (dateArray) => {
    return dateArray.map((date, index) => {
      const className = () => {
        let className = "calBodyHeaderCell";
        if (index === 0) {
          return className + " date-sun";
        } else if (index === 6) {
          return className + " date-sat";
        } else {
          return className + " date-weekday";
        }
      };
      return <div className={className()}>{date}</div>;
    });
  };

  return (
    <div className="calBodyWrapper">
      <div className="calBodyHeader">{mapArrayToDate(dateArray)}</div>
      <div className="calBodyContent"></div>
    </div>
  );
}

export default Calendar;
