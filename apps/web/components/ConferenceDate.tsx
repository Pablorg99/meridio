import { Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

type Props = {
  startDate: Date;
  endDate: Date;
};

const months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export const ConferenceDate: React.FunctionComponent<Props> = ({ startDate, endDate }) => {
  const datesAreOnSameDay = useMemo(
    () =>
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate(),
    [startDate, endDate]
  );

  const datesAreOnSameMonth = useMemo(
    () => startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() === endDate.getMonth(),
    [startDate, endDate]
  );

  if (datesAreOnSameDay) {
    return (
      <Text fontSize={'4xl'} data-testid="conference-date">
        {startDate.getDate()} {months[startDate.getMonth()]} {startDate.getFullYear()}
      </Text>
    );
  }

  if (datesAreOnSameMonth) {
    return (
      <Text fontSize={'4xl'} data-testid="conference-date">
        {startDate.getDate()}-{endDate.getDate()} {months[startDate.getMonth()]} {startDate.getFullYear()}
      </Text>
    );
  }

  return (
    <Text fontSize={'4xl'} data-testid="conference-date">
      {startDate.getDate()} {months[startDate.getMonth()]} - {endDate.getDate()} {months[endDate.getMonth()]}{' '}
      {startDate.getFullYear()}
    </Text>
  );
};
