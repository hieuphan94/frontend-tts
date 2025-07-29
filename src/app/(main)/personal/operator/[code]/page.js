'use client';
import React, { useState } from 'react';
import { ItineraryTable } from '../components/ItineraryTable';
import { ServicesTable } from '../components/ServicesTable';
import { mockDataItineraryTable } from '../data/mockDataBookingDetail';

const tabs = [
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'services', label: 'Services Group' },
]

export default function BookingDetail({ code }) {
    const [activeTab, setActiveTab] = useState('itinerary');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    // Mock booking data - sử dụng code được truyền vào
    const bookingInfo = {
        code: code || '0305-ASCORE-STS',
        sale: 'Nguyễn Văn A',
        groupSize: '70 pax (3 nhóm)',
        arrival: '01/07/2025',
        departReturn: '06/07/2025',
        report: 'ASCORE STS Hanoi - Halong'
    };

    const infoFields = [
        {
            label: 'Code',
            value: bookingInfo.code,
        },
        {
            label: 'Sale',
            value: bookingInfo.sale,
        },
        {
            label: 'Group Size',
            value: bookingInfo.groupSize,
        },
        {
            label: 'Arrival',
            value: bookingInfo.arrival,
        },
        {
            label: 'Depart / Return',
            value: bookingInfo.departReturn,
        },
        {
            label: 'Report',
            value: bookingInfo.report,
        }
    ];

    return (
        <div className='w-full'>
            <div className="mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {infoFields.map((field) => {
                            return (
                                <div key={field.label} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">{field.label}</p>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1 font-semibold">
                                            {field.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-2 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`pb-2 px-1 ${activeTab === tab.id
                            ? 'border-b-2 border-primary text-primary font-medium'
                            : 'text-gray-500'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'itinerary' && (
                <div className="mt-4">
                    <ItineraryTable data={mockDataItineraryTable} />
                </div>
            )}

            {activeTab === 'services' && (
                <div className="mt-4">
                    <ServicesTable />
                </div>
            )}
        </div>
    );
}
