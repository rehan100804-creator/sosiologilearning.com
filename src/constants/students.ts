export interface Student {
  nim: string;
  name: string;
  isDosen?: boolean;
}

export const ALLOWED_STUDENTS: Student[] = [
  { nim: '23058172', name: 'Melita Deli Yani' },
  { nim: '21058158', name: 'Mhd Fauzan' },
  { nim: '23058173', name: 'Miftahul Ilmi' },
  { nim: '23058174', name: 'Muchtaro Al Syafiq' },
  { nim: '23058176', name: 'Muhammad Rafi Sumirat' },
  { nim: '23058105', name: 'Najwa Rosyidah' },
  { nim: '23058106', name: 'Nandana Nabila Zuhdi' },
  { nim: '23058107', name: 'Natasya Amelia Putri' },
  { nim: '23058108', name: 'Nazillaturrahmi' },
  { nim: '23058179', name: 'Nurida Wita' },
  { nim: '23058109', name: 'Ocha' },
  { nim: '23058034', name: 'Pipia Nora Fitri' },
  { nim: '23058180', name: 'Pujawulan Dari' },
  { nim: '23058110', name: 'Qavka Navisa' },
  { nim: '23058111', name: 'Radea Villa Ananda' },
  { nim: '23058112', name: 'Rahma Dilla' },
  { nim: '242089', name: 'Rani Kartika, M.Pd. (Dosen)', isDosen: true },
  { nim: '23058036', name: 'Rania Alyasin' },
  { nim: '23058115', name: 'Rayhan Adriansyah Permana' },
  { nim: '23058116', name: 'Renaldi Aprinel Putra' },
  { nim: '23058037', name: 'Reri Damai Gea' },
  { nim: '23058183', name: 'Resa Afriani' },
  { nim: '23058184', name: 'Reva Lina Putri' },
  { nim: '23058117', name: 'Reza Aulia Nofitri' },
  { nim: '23058185', name: 'Reza Mai Saputri' },
  { nim: '23058118', name: 'Rezi Yulia Delova' },
  { nim: '23058038', name: 'Rezki Amelia Safitri' },
  { nim: '23058120', name: 'Rila Wati' },
  { nim: '23058039', name: 'Sabar Aulia Rahman' },
  { nim: '23058040', name: 'Savia Anggi Mustikasari' },
  { nim: '23058041', name: 'Selfira Cania' }
];

export function validateStudent(inputName: string, inputNim: string): Student | null {
  const normalizedInputNim = inputNim.trim();
  const normalizedInputName = inputName.trim().toLowerCase();

  // Find by NIM first
  const student = ALLOWED_STUDENTS.find(s => s.nim === normalizedInputNim);
  if (!student) return null;

  // Perform case-insensitive loose matching on name
  const registeredName = student.name.toLowerCase();
  
  // Custom check: either equal, or registered name contains input name, or input name contains registered name (or part of it)
  // For Rani, registered name is 'rani kartika, m.pd. (dosen)'. If they input 'Rani Kartika', clean registered name of titles.
  const cleanRegisteredName = registeredName
    .replace(/, m\.pd\./gi, '')
    .replace(/\(dosen\)/gi, '')
    .trim();

  if (
    registeredName === normalizedInputName ||
    cleanRegisteredName === normalizedInputName ||
    cleanRegisteredName.includes(normalizedInputName) ||
    normalizedInputName.includes(cleanRegisteredName)
  ) {
    return student;
  }

  return null;
}
