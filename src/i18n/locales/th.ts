import { extendLocale } from './extendLocale'

const cat = {
  burnable: { icon: '🔥', label: 'ขยะเผาได้', shortLabel: 'เผาได้', container: 'ถุงใส/กึ่งใส', examples: 'เศษอาหาร พลาสติก โฟม', howTo: ['ใส่ถุงใส', 'สะเด็ดน้ำ', 'ก่อน 8:00 น.'] },
  'non-burnable': { icon: '🪨', label: 'ขยะเผาไม่ได้', shortLabel: 'เผาไม่ได้', container: 'ตะกร้าเหลือง', examples: 'แก้ว โลหะ เซรามิก', howTo: ['ตะกร้าเหลือง', 'ห่อของมีคม'] },
  paper: { icon: '📰', label: 'กระดาษ', shortLabel: 'กระดาษ', container: 'มัดด้วยเชือก', examples: 'หนังสือพิมพ์ กล่อง', howTo: ['มัดแยกประเภท'] },
  'pet-bottle': { icon: '🥤', label: 'ขวด PET', shortLabel: 'PET', container: 'ตะกร้าเหลือง', examples: 'ขวดใส', howTo: ['ถอดฝา ล้าง บี้'] },
  cans: { icon: '🥫', label: 'กระป๋อง', shortLabel: 'กระป๋อง', container: 'ตะกร้าเหลือง', examples: 'กระป๋องอาหาร', howTo: ['ล้างให้สะอาด'] },
  'glass-bottles': { icon: '🍾', label: 'ขวดแก้ว', shortLabel: 'ขวด', container: 'ตะกร้าน้ำเงิน', examples: 'ขวดเครื่องดื่ม', howTo: ['ล้าง ใส่ตะกร้าน้ำเงิน'] },
  clothing: { icon: '👕', label: 'เสื้อผ้าเก่า', shortLabel: 'เสื้อผ้า', container: 'ถุงใส', examples: 'เสื้อผ้าที่ใช้ซ้ำได้', howTo: ['ซักแห้ง ไม่ทิ้งวันฝน'] },
  'white-tray': { icon: '🍱', label: 'ถาดขาว', shortLabel: 'ถาดขาว', container: 'ตะกร้าเหลือง', examples: 'ถาดบรรจุเนื้อ', howTo: ['ล้างแห้ง'] },
  hazardous: { icon: '☣️', label: 'ของเสียอันตราย', shortLabel: 'อันตราย', container: 'ตะกร้าแดง', examples: 'สเปรย์ ถ่านไฟฉาย', howTo: ['ตะกร้าแดง'] },
  bulky: { icon: '🛋️', label: 'ขยะใหญ่', shortLabel: 'ใหญ่', container: 'จองล่วงหน้า', examples: '≥50cm หรือ ≥10kg', howTo: ['โทร 048-973-5300'] },
  'not-collected': { icon: '🚫', label: 'ไม่รับทิ้ง', shortLabel: 'ไม่รับ', container: 'รีไซเคิลพิเศษ', examples: 'แอร์ ทีวี PC', howTo: ['ช่องทางรับคืนพิเศษ'] },
}

export const th = extendLocale('th', 'ไทย', {
  ui: {
    headerTagline: 'เมืองโคชิงายะ ไซตามะ',
    headerTitle: 'คู่มือแยกขยะ',
    headerDesc: 'เผาได้ / เผาไม่ได้ / รีไซเคิล',
    tabGuide: 'หมวด',
    tabWizard: 'ขั้นตอน',
    tabPhoto: 'ถ่ายรูป',
    tabSearch: 'ค้นหา',
    tabSheet: 'ตาราง',
    tabOfficial: 'ทางการ',
    searchPlaceholder: 'เช่น ขวด PET ถ่าน กล่อง',
    disclaimer: 'คู่มืออ้างอิงไม่เป็นทางการ โปรดตรวจสอบเว็บไซต์เมืองโคชิงายะ',
    photoTitle: 'ตรวจด้วยรูป',
    wizardTitle: 'แนะนำทีละขั้น',
    wizardDesc: 'ตอบคำถามเพื่อดูขั้นตอนทั้งหมดต่อเนื่อง',
    cheatsheetTitle: 'ตารางสรุป',
    putOutTime: 'ก่อน 8:00 น. วันเก็บขยะ',
  },
  categories: cat,
  wizard: { materialTitle: 'วัสดุอะไร?', sizeTitle: 'ขนาดเท่าไร?', resultTitle: 'ผลลัพธ์และขั้นตอน' },
  official: { title: 'ข้อมูลทางการโคชิงายะ', desc: 'กฎล่าสุดอยู่ที่เว็บทางการ', sanaruNote: 'เมืองมี PDF หลายภาษา แอปนี้เป็นสรุปอิสระ' },
})
