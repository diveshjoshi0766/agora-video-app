import momentTimezone from "moment-timezone";

export namespace DateUtils {
  const extractTimesFromData = (visitTime: any) => {
    const startTimeArr = visitTime.startTime.split(":");
    const startVisitTimeMoment = momentTimezone(visitTime.scheduleDate);
    startVisitTimeMoment.hours(startTimeArr[0]);
    startVisitTimeMoment.minute(startTimeArr[1]);
    startVisitTimeMoment.second(startTimeArr[2]);

    const endTimeArr = visitTime.endTime.split(":");
    const endVisitTimeMoment = momentTimezone(visitTime.scheduleDate);
    endVisitTimeMoment.hours(endTimeArr[0]);
    endVisitTimeMoment.minute(endTimeArr[1]);
    endVisitTimeMoment.second(endTimeArr[2]);

    const userTimeMoment = momentTimezone(Date.now()); 
    const userTime = userTimeMoment.tz(visitTime.name);

    return [startVisitTimeMoment, endVisitTimeMoment, userTime];
  };

  export const checkValidTimeForMeeting = (visitTime: any) => {
    const [startVisitTimeMoment, endVisitTimeMoment, userTime] =
      extractTimesFromData(visitTime);  
    return userTime.isBetween(startVisitTimeMoment, endVisitTimeMoment);
  };

  export const getEarlyOrLate = (visitTime: any) => {
    const [startVisitTimeMoment, endVisitTimeMoment, userTime] =
      extractTimesFromData(visitTime);
    if (userTime.isBefore(startVisitTimeMoment)) return true;
    if (userTime.isAfter(endVisitTimeMoment)) return false;
  };

  export const isSameOrAfterTime = (visitTime: any) => {
    const [startVisitTimeMoment, endVisitTimeMoment, userTime] =
      extractTimesFromData(visitTime);

    return userTime.isSameOrAfter(startVisitTimeMoment)

  }
}
