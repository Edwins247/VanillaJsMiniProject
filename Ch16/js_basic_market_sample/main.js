import { getProductSection } from "./module/productSection.js";

try {
  const response = await fetch("public/mock/sectionListData.json");
  const data = await response.json();
  const sectionInfoList = data.sectionInfoList;

  sectionInfoList.forEach((sectionInfo) => {
    const productSectionDOM = getProductSection(sectionInfo);
    document.body.appendChild(productSection);
  })
} catch (error) {
  console.log(error);
}