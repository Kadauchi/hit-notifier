import moment from 'moment';
import psl from 'psl';

export function getDomain(url) {
  const { hostname } = new URL(url);
  const parsed = psl.parse(hostname);
  return parsed.domain;
}

export function getFormattedDate(date) {
  return moment(date).format(`LTS`);
}

export function getFoundAtOn(hit) {
  return `Found at ${getFormattedDate(hit.found)} on ${getDomain(hit.url)}`;
}
