'use client';
import React, { useState, useEffect } from 'react';
import { ItineraryTable } from '../components/ItineraryTable';
import { ServicesTable } from '../components/ServicesTable';
import { mockDataItineraryTable } from '../data/mockDataBookingDetail';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTrips } from '@/hooks/useTrips';
import { normalizedServices } from '../service/normalizedServices';

const tabs = [
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'services', label: 'Services Group' },
]

export default function BookingDetail({ code = '54510058-bcc4-491a-9f63-99a06588e25d' }) {
    const [activeTab, setActiveTab] = useState('itinerary');
    const router = useRouter();
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const { getTrip, currentTrip, loading } = useTrips();
    useEffect(() => {
        getTrip(code);
    }, [code]);


    const infoFields = [
        { label: 'Code', value: currentTrip?.code },
        { label: 'Sale', value: currentTrip?.sale },
        { label: 'Group Size', value: currentTrip?.groupSize },
        { label: 'Arrival', value: currentTrip?.arrival },
        { label: 'Depart / Return', value: currentTrip?.departReturn },
        { label: 'Report', value: currentTrip?.report },
    ];

    return (
        <div className='w-full'>
            {/* Breadcrumb */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={() => router.back()}
                        className="hover:text-primary flex items-center gap-1"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                    <span>/</span>
                    <span>Booking Detail</span>
                </div>
            </div>
            {/* Booking Info */}
            <div className="mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {infoFields.map((field) => {
                            return (
                                <div key={field.label} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm  text-gray-700">{field.label}</p>
                                        </div>
                                        <p className="text-sm text-gray-900 mt-1 font-semibold">
                                            {field.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tabs */}
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
                    <ItineraryTable data={normalizedServices(currentTrip?.tripDays)} />
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
