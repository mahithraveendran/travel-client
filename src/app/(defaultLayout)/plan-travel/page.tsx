"use client"
import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, Timeline, Card } from 'antd';
import moment from 'moment';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  mood: string;
}

interface Itinerary {
  day: string;
  date: string;
  activities: Array<{
    time: string;
    description: string;
    location: string;
    type: string;
  }>;
}

const PlanTravel: React.FC = () => {
  const genAI = new GoogleGenerativeAI("AIzaSyAogPfiRizsCmzy8KdrH3lXGTPuOcIVRTY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
    mood: '',
  });
  const [itineraryData, setItineraryData] = useState<Itinerary | null>(null);

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
    };

    try {
      const prompt = `i have this data ${JSON.stringify(formattedValues)}, create me a travel itinerary with this data. It should be a detailed description, and it should have a timeline. Provide it as JSON so that I can map it. ,, only give me the json , not other text , i repeat no other text than json , nothig should be there in the end and the start , the response should be in this format {
  "formattedValues": {
    "destination": "Paris, France",
    "departureDate": "2024-08-15",
    "returnDate": "2024-08-22",
    "activities": [
      {
        "day": "Day 1",
        "description": "Arrive in Paris. Check into hotel and rest.",
        "time": "Afternoon"
      },
      {
        "day": "Day 2",
        "description": "Visit Louvre Museum. Explore historical artifacts.",
        "time": "Morning to Evening"
      },
      {
        "day": "Day 3",
        "description": "Take a boat tour on the Seine River. Enjoy iconic views of Paris.",
        "time": "Morning"
      },
      {
        "day": "Day 4",
        "description": "Visit Eiffel Tower. Take in panoramic views of the city.",
        "time": "Afternoon"
      }
    ]
  }
}
`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const regex = /^```(.*?)```$/s;
      let text: any = await response.text().replace(regex, '$1');
      text = text.replace(/^json/, '');
      console.log(text)
      const json = JSON.parse(text);
      setItineraryData(json);
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-24">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Travel Plan</h1>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            numberOfPeople: 1,
            startDate: moment(),
            endDate: moment(),
          }}
        >
          <Form.Item
            label="Destination"
            name="destination"
            rules={[{ required: true, message: 'Please enter your destination!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select a start date!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select an end date!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Number of People"
            name="numberOfPeople"
            rules={[{ required: true, message: 'Please enter the number of people traveling!' }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Mood"
            name="mood"
            rules={[{ required: true, message: 'Please select a mood!' }]}
          >
            <Select className="w-full">
              <Option value="Relaxed">Relaxed</Option>
              <Option value="Adventurous">Adventurous</Option>
              <Option value="Romantic">Romantic</Option>
              <Option value="Family">Family</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {itineraryData && itineraryData.formattedValues &&  (
        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <a href={`https://www.google.com/maps/place/${encodeURIComponent(itineraryData?.formattedValues?.destination)}`} target='_blank'>
                <h2 className="text-xl font-bold mb-6 underline text-indigo-500">Itinerary {itineraryData?.formattedValues?.destination}</h2>
            </a>
          {itineraryData?.formattedValues?.activities?.map((activity) => (
            <div key={activity.day}>
              <Card title={`${activity.day} `} className="mb-4">
                <Timeline mode="left">
                    <Timeline.Item
                      key={activity.day}
                      label={activity.time}
                      dot={<ClockCircleOutlined className="text-blue-500" />}
                    >
                      <p>{activity.day}</p>
                      <p><EnvironmentOutlined /> {activity.description}</p>
                      <p>Time: {activity.time}</p>
                    </Timeline.Item>
                </Timeline>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanTravel;
