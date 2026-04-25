import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Modern color palette
const modernColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  tertiary: '#ec4899',
  accent1: '#a78bfa',
  accent2: '#c084fc',
  gradient: ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#ec4899']
};

const baseBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 12, right: 12, left: 4, bottom: 12 } },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      titleColor: '#ffffff',
      bodyColor: 'rgba(224, 224, 224, 0.9)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
      usePointStyle: true,
      padding: 12,
      displayColors: true,
      callbacks: {
        labelColor: function() {
          return {
            borderColor: modernColors.primary,
            backgroundColor: modernColors.primary,
            borderWidth: 2,
            borderRadius: 2,
          };
        },
      },
    },
  },
  scales: {
    x: {
      grid: { 
        display: false,
        drawBorder: false,
      },
      ticks: { 
        color: 'rgba(224, 224, 224, 0.6)', 
        font: { size: 11, weight: '500' }, 
        maxRotation: 45, 
        autoSkip: true,
        padding: 8,
      },
    },
    y: {
      beginAtZero: true,
      grid: { 
        color: 'rgba(99, 102, 241, 0.08)',
        drawBorder: false,
      },
      ticks: { 
        color: 'rgba(224, 224, 224, 0.6)', 
        font: { size: 11, weight: '500' },
        padding: 8,
      },
    },
  },
};

const basePieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { 
        color: '#ffffff', 
        font: { size: 11, weight: '500' },
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      titleColor: '#ffffff',
      bodyColor: 'rgba(224, 224, 224, 0.9)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
      padding: 12,
    },
  },
};

export const ResumeDownloadsChart = ({ data, options }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Bar data={{
      ...data,
      datasets: data.datasets.map(ds => ({
        ...ds,
        backgroundColor: modernColors.secondary,
        hoverBackgroundColor: modernColors.accent1,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 16,
        maxBarThickness: 24,
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
        backgroundColor: modernColors.primary,
        hoverBackgroundColor: modernColors.accent1,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 16,
        maxBarThickness: 24,
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
        backgroundColor: modernColors.gradient,
        borderWidth: 3,
        borderColor: 'rgba(10, 10, 10, 0.8)',
        hoverBorderColor: 'rgba(99, 102, 241, 0.5)',
        hoverBorderWidth: 4,
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
        backgroundColor: modernColors.gradient,
        hoverBackgroundColor: modernColors.accent1,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 16,
        maxBarThickness: 24,
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
        backgroundColor: [modernColors.primary, modernColors.secondary, modernColors.accent1],
        borderWidth: 3,
        borderColor: 'rgba(10, 10, 10, 0.8)',
        hoverBorderColor: 'rgba(99, 102, 241, 0.5)',
        hoverBorderWidth: 4,
      }))
    }} options={{
      ...basePieOptions,
      ...options,
      plugins: { ...(basePieOptions.plugins || {}), legend: { position: 'bottom', labels: { color: '#ffffff', font: { size: 11, weight: '500' }, padding: 16, usePointStyle: true } } }
    }} />
  </div>
);
