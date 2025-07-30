import { memo, useState, useEffect } from 'react';


// Utility functions
const calculateTotalPrice = (selectedServices, serviceList) => {
    return selectedServices.reduce((total, serviceName) => {
        const service = serviceList.find(s => s.name === serviceName);
        return total + (service ? service.price : 0);
    }, 0);
};

const parseSelectedServices = (serviceString) => {
    return serviceString ? serviceString.split(', ') : [];
};

const formatSelectedServices = (services) => {
    return services.join(', ');
};

// Reusable ServiceMultiSelect Component
const ServiceMultiSelect = memo(({ 
    value, 
    onChange, 
    options = [], 
    placeholder = 'Chọn dịch vụ',
    showTotalPrice = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedServices = parseSelectedServices(value);
    const totalPrice = calculateTotalPrice(selectedServices, options);

    const handleToggleService = (serviceName) => {
        const isSelected = selectedServices.includes(serviceName);
        let newServices;
        
        if (isSelected) {
            newServices = selectedServices.filter(s => s !== serviceName);
        } else {
            newServices = [...selectedServices, serviceName];
        }
        
        onChange(formatSelectedServices(newServices));
    };

    const handleSelectAll = () => {
        const allServices = options.map(s => s.name).join(', ');
        onChange(allServices);
    };

    const handleDeselectAll = () => {
        onChange('');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.service-dropdown-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative service-dropdown-container`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left border border-gray-300 rounded px-2 py-1 text-xs hover:border-primary-500 flex justify-between items-center"
            >
                <span className="truncate">
                    {value || placeholder}
                </span>
                <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 border rounded bg-white shadow-lg text-xs">
                    <div className="flex justify-between items-center p-2 border-b">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Tất cả
                            </button>
                            <button
                                type="button"
                                onClick={handleDeselectAll}
                                className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Bỏ chọn
                            </button>
                        </div>
                    </div>
                    <div className={`max-h-32 overflow-y-auto`}>
                        {options.map(service => {
                            const isSelected = selectedServices.includes(service.name);
                            return (
                                <label key={service.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleToggleService(service.name)}
                                        className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="flex-1 flex flex-row justify-between items-center gap-2">
                                        <div className="text-xs font-medium">{service.name}</div>
                                        <div className="text-xs text-gray-500">{service.price.toLocaleString()} VND</div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                    {showTotalPrice && value && (
                        <div className="p-2 border-t text-xs text-gray-600 bg-gray-50">
                            <span className="font-medium">Tổng giá:</span> {totalPrice.toLocaleString()} VND
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default ServiceMultiSelect; 