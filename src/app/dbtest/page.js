'use client'
import { getData } from '@/Components/Common/dbfetcher';
import { encryptPassword , decryptPassword } from '@/Components/utils/encryptdecrypt';
import React, { useEffect, useState } from 'react';
const Page = () => {
  const pass = "admin123";
  const encrypt = encryptPassword(pass);
  const decrypt = decryptPassword('120b000c1c505c575b');
  return (
    <div>
       <div>
    </div>
      <h1>Students List </h1>
      <ul>
        <li className='text-danger'>encrypted password = {encrypt}</li>
        <li>decrypted password = {decrypt}</li>
      </ul>
    </div>
  );
};

export default Page;
