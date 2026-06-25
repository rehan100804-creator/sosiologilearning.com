export const FOLDER_ID = '1piNxr2UgeVZL80APe8LlJAhltsdp0XS1';

export async function findOrCreateSpreadsheet(token: string) {
  // 1. Search for existing spreadsheet in folder
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and name = 'Data Hasil Belajar Siswa - Sosiologi' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  
  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // 2. Create new spreadsheet if not found
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title: 'Data Hasil Belajar Siswa - Sosiologi' }
    })
  });
  
  const spreadsheet = await createRes.json();
  const spreadsheetId = spreadsheet.spreadsheetId;

  // 3. Move to folder
  await fetch(`https://www.googleapis.com/drive/v3/files/${spreadsheetId}?addParents=${FOLDER_ID}&removeParents=root`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });

  // 4. Set Headers
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:G1?valueInputOption=RAW`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [['Timestamp', 'Nama', 'Kelas', 'Skor Quiz', 'Menonton Video', 'Membaca Modul', 'Sumber Lainnya']]
    })
  });

  return spreadsheetId;
}

export async function appendStudentData(token: string, spreadsheetId: string, data: any) {
  const values = [[
    new Date().toLocaleString('id-ID'),
    data.name,
    data.class,
    data.score || '-',
    data.watchedVideo ? 'Sudah' : 'Belum',
    data.readModule ? 'Sudah' : 'Belum',
    data.viewedSources ? 'Sudah' : 'Belum'
  ]];

  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:G:append?valueInputOption=RAW`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values })
  });
}

export async function syncAllStudentsData(token: string, spreadsheetId: string, studentRows: any[]) {
  // studentRows: array of arrays, representing rows of students
  // Column Headers are: ['No', 'NIM', 'Nama Lengkap', 'Skor Quiz', 'Menonton Video', 'Membaca Modul', 'Melihat Sumber Lainnya', 'Pembaruan Terakhir']
  
  // 1. Write headers first starting at A1:H1
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:H1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [['No', 'NIM / ID Kelas', 'Nama Lengkap', 'Skor Quiz', 'Menonton Video', 'Membaca Modul', 'Melihat Sumber Lainnya', 'Pembaruan Terakhir']]
    })
  });

  // 2. Overwrite students data starting A2:H100 to clear previous student list if any and keep it perfectly clean
  // We can write all studentRows starting at A2
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A2:H100?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: studentRows
    })
  });
}
