import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import SectionComponent from '@/components/layout/section-component';
import { DataTableDemo } from './datatable';
import AccordionList from './accordion';
import ComponentChecker from '../componentchecker';

interface DataRendererProps {
  selectedItem: any;
  fallbackData?: any[];
}

const DataRenderer: React.FC<DataRendererProps> = ({ selectedItem, fallbackData = [] }) => {
  // Get data from different sources
  const chartAccountsData = [
    {
      display: "section",
      name: "Assets",
      active: true,
      data: [
        { name: "Cash", active: "$50,000", editable: true },
        { name: "Accounts Receivable", active: "$25,000", editable: true },
        { name: "Inventory", active: "$75,000", editable: true },
        { name: "Equipment", active: "$100,000", editable: true }
      ]
    },
    {
      display: "section", 
      name: "Liabilities",
      active: true,
      data: [
        { name: "Accounts Payable", active: "$15,000", editable: true },
        { name: "Notes Payable", active: "$30,000", editable: true },
        { name: "Accrued Expenses", active: "$5,000", editable: true }
      ]
    }
  ];

  const journalsData = [
    { id: "j001", amount: 5000, status: "posted", email: "journal@company.com", description: "Sales Revenue" },
    { id: "j002", amount: 2500, status: "pending", email: "journal@company.com", description: "Office Supplies" },
    { id: "j003", amount: 7500, status: "posted", email: "journal@company.com", description: "Equipment Purchase" },
    { id: "j004", amount: 1200, status: "draft", email: "journal@company.com", description: "Utilities Expense" },
    { id: "j005", amount: 3000, status: "posted", email: "journal@company.com", description: "Rent Payment" }
  ];

  const transactionsData = [
    { id: "t001", amount: 1500, status: "completed", email: "transactions@company.com", description: "Customer Payment" },
    { id: "t002", amount: 800, status: "pending", email: "transactions@company.com", description: "Vendor Payment" },
    { id: "t003", amount: 2200, status: "completed", email: "transactions@company.com", description: "Bank Transfer" },
    { id: "t004", amount: 950, status: "failed", email: "transactions@company.com", description: "Credit Card Payment" }
  ];

  const employeeData = [
    {
      display: "section",
      name: "Full-time Employees", 
      active: true,
      data: [
        { name: "John Smith", active: "Manager", editable: true },
        { name: "Sarah Johnson", active: "Developer", editable: true },
        { name: "Mike Wilson", active: "Designer", editable: true },
        { name: "Lisa Brown", active: "Analyst", editable: true }
      ]
    },
    {
      display: "section",
      name: "Part-time Employees",
      active: true, 
      data: [
        { name: "Tom Davis", active: "Intern", editable: true },
        { name: "Amy Chen", active: "Consultant", editable: true }
      ]
    }
  ];

  const crmData = [
    { id: "c001", amount: 15000, status: "hot", email: "lead1@prospect.com", description: "Enterprise Client" },
    { id: "c002", amount: 5000, status: "warm", email: "lead2@prospect.com", description: "Small Business" },
    { id: "c003", amount: 25000, status: "cold", email: "lead3@prospect.com", description: "Government Contract" },
    { id: "c004", amount: 8000, status: "hot", email: "lead4@prospect.com", description: "Startup Client" }
  ];

  const customAppData = [
    {
      display: "section",
      name: "Custom Features",
      active: true,
      data: [
        { name: "Feature A", active: "Active", editable: true },
        { name: "Feature B", active: "In Development", editable: true },
        { name: "Feature C", active: "Planned", editable: true }
      ]
    }
  ];

  // Determine which data to show based on the selected item
  const getDataForItem = () => {
    if (!selectedItem || !selectedItem.url) {
      return fallbackData;
    }

    const url = selectedItem.url.toLowerCase();
    
    if (url.includes('chart-of-accounts')) {
      return chartAccountsData;
    } else if (url.includes('journal')) {
      return journalsData;
    } else if (url.includes('transaction')) {
      return transactionsData;
    } else if (url.includes('employee') || url.includes('hr')) {
      return employeeData;
    } else if (url.includes('crm')) {
      return crmData;
    } else if (url.includes('custom')) {
      return customAppData;
    }
    
    // Default data for other pages
    return [
      {
        display: "section",
        name: "General Data",
        active: true,
        data: [
          { name: "Item 1", active: "Value 1", editable: true },
          { name: "Item 2", active: "Value 2", editable: true },
          { name: "Item 3", active: "Value 3", editable: true }
        ]
      }
    ];
  };

  const dataToRender = getDataForItem();

  // Render based on template type
  const renderByTemplate = () => {
    if (selectedItem?.template === 'templateone') {
      // Table template
      return <DataTableDemo data={dataToRender} />;
    } else if (selectedItem?.template === 'templatetwo') {
      // Tab with accordion template
      if (selectedItem?.subItems) {
        return <ComponentChecker data={selectedItem.subItems} />;
      }
    } else if (selectedItem?.template === 'templatecustom') {
      // Custom template with sections
      if (selectedItem?.subItems && Array.isArray(selectedItem.subItems)) {
        return (
          <div className="space-y-6">
            {selectedItem.subItems.map((item: any, index: number) => (
              <div key={index} className="mb-6 p-6 bg-white rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-4">{item.name}</h4>
                <SectionComponent data={item} />
              </div>
            ))}
          </div>
        );
      }
    }

    // Default rendering for section-based data
    if (Array.isArray(dataToRender)) {
      return (
        <div className="space-y-6">
          {dataToRender.map((item: any, index: number) => (
            <div key={index} className="mb-6 p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-4">{item.name || `Section ${index + 1}`}</h4>
              <SectionComponent data={item} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-gray-500">No data available for this page.</p>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {renderByTemplate()}
    </div>
  );
};

export default DataRenderer;