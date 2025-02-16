import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Fungsi untuk mengubah angka bulan menjadi nama bulan
const getMonthName = (monthNumber) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ]
  return months[monthNumber]
}

export const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Update waktu setiap menit
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)

    // Membersihkan interval
    return () => clearInterval(timer)
  }, [])

  // Format tanggal custom
  const formatDate = () => {
    const date = currentDate
    const day = date.getDate()
    const month = getMonthName(date.getMonth())
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  // Format waktu tanpa detik
  const formatTime = () => {
    const date = currentDate
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <header className="flex justify-between items-center font-poppins p-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Hey, Name</h1>
        <div className="flex space-x-4">
          <h2 className="text-sm font-medium text-gray-500">
            {formatDate()}
          </h2>
          <h2 className="text-sm font-medium text-gray-500">
            {formatTime()}
          </h2>
        </div>
      </div>
      <div className="bg-ashGray2 aspect-square w-11 h-11 rounded-full flex justify-center items-center">
        {/* Konten avatar atau ikon */}
      </div>
    </header>
  )
}