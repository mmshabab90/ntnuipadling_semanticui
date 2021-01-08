// dummy funciton to mock an api behavior
// currently replaced with firebase firestore 

import { delay } from "./../common/util/util";
import { eventsData } from "./eventsData";
export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(eventsData);
  });
}
