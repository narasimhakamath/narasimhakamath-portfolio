import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


const baseBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 8, left: 0, bottom: 8 } },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#232046',
      titleColor: '#c084fc',
      bodyColor: '#ded0b6',
      borderColor: 'rgba(192,160,255,0.12)',
      borderWidth: 1,
      usePointStyle: true,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#cfc3f8', font: { size: 9 }, maxRotation: 45, autoSkip: true },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(185,174,235,0.06)' },
      ticks: { color: '#bfb8d9', font: { size: 9 } },
    },
  },
};

const basePieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#ffffff', font: { size: 10 } },
    },
    tooltip: {
      backgroundColor: '#232046',
      titleColor: '#c084fc',
      bodyColor: '#ded0b6',
      borderColor: 'rgba(192,160,255,0.12)',
      borderWidth: 1,
    },
  },
};

export const ResumeDownloadsChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Bar data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: '#c084fc',
        hoverBackgroundColor: '#9a6ef2',
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 12,
        maxBarThickness: 18,
      }))
    }} options={{ ...baseBarOptions, ...options }} />
  </div>
);

export const PageViewsChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Bar data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: '#8F43EE',
        hoverBackgroundColor: '#9f7bf9',
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 12,
        maxBarThickness: 18,
      }))
    }} options={{ ...baseBarOptions, ...options }} />
  </div>
);

export const TopCountriesChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Pie data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: ['#c084fc', '#8F43EE', '#b9aeea', '#ded0b6'],
        borderWidth: 2,
        borderColor: '#18122B',
      }))
    }} options={{
      ...basePieOptions,
      ...options,
      plugins: { ...(basePieOptions.plugins || {}), legend: { position: 'bottom', labels: { color: '#ffffff', font: { size: 9 } } } }
    }} />
  </div>
);

export const EngagementChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Bar data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: ['#ded0b6', '#b9aeea', '#c084fc', '#8F43EE'],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 12,
      }))
    }} options={{ ...baseBarOptions, ...options }} />
  </div>
);

export const DeviceTypeChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Pie data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: ['#8F43EE', '#c084fc', '#b9aeea'],
        borderWidth: 2,
        borderColor: '#18122B',
      }))
    }} options={{
      ...basePieOptions,
      ...options,
      plugins: { ...(basePieOptions.plugins || {}), legend: { position: 'bottom', labels: { color: '#ffffff' } } }
    }} />
  </div>
);
