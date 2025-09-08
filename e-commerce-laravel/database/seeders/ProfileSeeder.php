<?php

namespace Database\Seeders;

use Database\Factories\Profile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            [
                'user_id' => '075b40c4-f5fe-44a7-ab8f-401f92c138fd',
                'full_name' => 'Nguyễn Văn A',
                'phone' => '0901000001',
                'address' => 'Hà Nội',
                'gender' => 'MALE',
                'dob' => '2000-01-01'
            ],
            [
                'user_id' => '0bbec3f6-810f-4918-9e28-87bbf9a51544',
                'full_name' => 'Trần Thị B',
                'phone' => '0901000002',
                'address' => 'Đà Nẵng',
                'gender' => 'FEMALE',
                'dob' => '1999-02-02'
            ],
            [
                'user_id' => '0d320eaa-2bde-474c-a940-0c65270876c1',
                'full_name' => 'Lê Văn C',
                'phone' => '0901000003',
                'address' => 'Hồ Chí Minh',
                'gender' => 'MALE',
                'dob' => '2001-03-03'
            ],
            [
                'user_id' => '0fb0d6a1-9c13-444d-9d85-d7e28939601b',
                'full_name' => 'Phạm Thị D',
                'phone' => '0901000004',
                'address' => 'Hải Phòng',
                'gender' => 'FEMALE',
                'dob' => '1998-04-04'
            ],
            [
                'user_id' => '1f78adf6-f4ba-4721-8736-5fdc6f4b2f71',
                'full_name' => 'Hoàng Văn E',
                'phone' => '0901000005',
                'address' => 'Cần Thơ',
                'gender' => 'MALE',
                'dob' => '1997-05-05'
            ],
            [
                'user_id' => '4906c915-0048-4ddb-82b0-7273a17d0965',
                'full_name' => 'Ngô Thị F',
                'phone' => '0901000006',
                'address' => 'Huế',
                'gender' => 'FEMALE',
                'dob' => '2002-06-06'
            ],
            [
                'user_id' => '4ce8f99d-d297-42d7-8b94-adcba52433c9',
                'full_name' => 'Đỗ Văn G',
                'phone' => '0901000007',
                'address' => 'Quảng Ninh',
                'gender' => 'MALE',
                'dob' => '2000-07-07'
            ],
            [
                'user_id' => '50d196c1-f48c-4cec-ac9f-2ec468359c34',
                'full_name' => 'Vũ Thị H',
                'phone' => '0901000008',
                'address' => 'Nam Định',
                'gender' => 'FEMALE',
                'dob' => '1995-08-08'
            ],
            [
                'user_id' => '50e5b637-ef29-4455-8ba1-2ee48c6a03de',
                'full_name' => 'Nguyễn Văn I',
                'phone' => '0901000009',
                'address' => 'Nghệ An',
                'gender' => 'MALE',
                'dob' => '1994-09-09'
            ],
            [
                'user_id' => '579c5278-b849-4502-80f3-6bcbb6f38526',
                'full_name' => 'Trần Thị K',
                'phone' => '0901000010',
                'address' => 'Thanh Hóa',
                'gender' => 'FEMALE',
                'dob' => '1996-10-10'
            ],
            [
                'user_id' => '5cf0a9b5-d52b-44e4-9720-5f82ddb71dfe',
                'full_name' => 'Phạm Văn L',
                'phone' => '0901000011',
                'address' => 'Bắc Ninh',
                'gender' => 'MALE',
                'dob' => '1993-11-11'
            ],
            [
                'user_id' => '74e0eb5d-261d-4a7b-af04-ccfe9840b442',
                'full_name' => 'Nguyễn Thị M',
                'phone' => '0901000012',
                'address' => 'Lào Cai',
                'gender' => 'FEMALE',
                'dob' => '2001-12-12'
            ],
            [
                'user_id' => '7519ad96-b5d6-4ddf-bec1-2a8868cb810f',
                'full_name' => 'Hoàng Văn N',
                'phone' => '0901000013',
                'address' => 'Bắc Giang',
                'gender' => 'MALE',
                'dob' => '1992-01-13'
            ],
            [
                'user_id' => '7e4d4b56-b93e-4add-b9e4-a001d72080ee',
                'full_name' => 'Trần Thị O',
                'phone' => '0901000014',
                'address' => 'Hưng Yên',
                'gender' => 'FEMALE',
                'dob' => '1991-02-14'
            ],
            [
                'user_id' => '8b75a00b-b9fd-4954-9f11-c960a18c4264',
                'full_name' => 'Đỗ Văn P',
                'phone' => '0901000015',
                'address' => 'Hà Nam',
                'gender' => 'MALE',
                'dob' => '1990-03-15'
            ],
            [
                'user_id' => '8f038af5-ef11-45d0-8c00-928c3248b92a',
                'full_name' => 'Ngô Thị Q',
                'phone' => '0901000016',
                'address' => 'Hà Tĩnh',
                'gender' => 'FEMALE',
                'dob' => '1989-04-16'
            ],
            [
                'user_id' => '912b1061-6db8-4b93-9ea1-e97f6b89d915',
                'full_name' => 'Lê Văn R',
                'phone' => '0901000017',
                'address' => 'Phú Thọ',
                'gender' => 'MALE',
                'dob' => '1993-05-17'
            ],
            [
                'user_id' => 'a2ed6f4a-726b-4c99-95f3-cfa93aa0b2da',
                'full_name' => 'Phạm Thị S',
                'phone' => '0901000018',
                'address' => 'Yên Bái',
                'gender' => 'FEMALE',
                'dob' => '1992-06-18'
            ],
            [
                'user_id' => 'a3fe3d2d-2169-4952-8bcc-e78a5c50950f',
                'full_name' => 'Nguyễn Văn T',
                'phone' => '0901000019',
                'address' => 'Kon Tum',
                'gender' => 'MALE',
                'dob' => '1991-07-19'
            ],
            [
                'user_id' => 'ace741db-a95f-4706-9110-83f8d6d720ae',
                'full_name' => 'Vũ Thị U',
                'phone' => '0901000020',
                'address' => 'Quảng Nam',
                'gender' => 'FEMALE',
                'dob' => '1990-08-20'
            ],
        ];

        foreach ($samples as $s) {
            Profile::create(array_merge($s, ['id' => Str::uuid()]));
        }
    }
}
