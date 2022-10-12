import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Calendar from '@/Components/Calendar';
import Date from '@/Components/Date';
import Agenda from '@/Components/Agenda';

export default function Scheduler(props) {
    const { groups } = props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Scheduler</h2>}
        >
            <Head title="Scheduler" />

            <Calendar />
            <Date />
            <Agenda groups={groups}/>
        </AuthenticatedLayout>
    );
}
