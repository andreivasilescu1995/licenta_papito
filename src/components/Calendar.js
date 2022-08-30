import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

import ModalAdd from '../components/ModalAdd';
import { getUserEvents } from '../redux/slices/calendar';
import { showModalAdd } from '../redux/slices/modals';

const localizer = momentLocalizer(moment);

export const CalendarComponent = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.calendar);
    const [selectedSlot, setSelectedSlot] = useState({});

    useEffect(() => {
        dispatch(getUserEvents());
    }, []); //eslint-disable-line

    const handleOnSelectSlot = (slot) => {
        setSelectedSlot(slot);
        dispatch(showModalAdd({ showModalAdd: true }));
    }

    return (
        <>
            <ModalAdd fields={['title']} entityName='event' propsValues={selectedSlot} />
            <Calendar
                localizer={localizer}
                events={events && events.length ? events : []}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable={true}
                onSelectSlot={handleOnSelectSlot}
            />
        </>
    )
}