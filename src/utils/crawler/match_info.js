import { chromium } from "playwright";

export const match_info_crawler = async (year, month) => {
    const browser = await chromium.launch({ headless: true }); // 브라우저 UI를 보기 위해 false 설정
    const page = await browser.newPage();
    await page.goto("https://www.koreabaseball.com/Schedule/Schedule.aspx");

    // 드롭다운을 클릭하여 열기
    await page.click('#ddlMonth'); // 드롭다운의 ID 선택자

    // 선택할 월을 지정
    const monthToSelect = month; // 예: 03월
    const optionSelector = `option[value="${monthToSelect}"]`; // 선택할 월의 옵션

    try {
        // 드롭다운이 열릴 때까지 대기
        await page.waitForTimeout(1000); // 드롭다운 메뉴가 열리기를 기다립니다.

        // 자바스크립트를 사용하여 드롭다운 옵션을 클릭
        await page.evaluate((optionSelector) => {
            // 드롭다운 요소와 옵션 요소를 찾기
            const selectElement = document.querySelector('#ddlMonth');
            const optionElement = document.querySelector(optionSelector);

            if (selectElement && optionElement) {
                selectElement.value = optionElement.value;
                // 선택된 값으로 변경하고, change 이벤트 트리거
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
            }
        }, optionSelector);

        console.log(`${year}년 ${monthToSelect}월 경기 일정 크롤링.`);
    } catch (error) {
        console.error(`월 ${monthToSelect} 선택 실패: ${error.message}`);
    }

    // 테이블 데이터 추출
    try {
        // XPath를 사용하여 테이블의 tbody 요소를 찾기
        const tbodyLocator = page.locator('//*[@id="tblScheduleList"]/tbody');
        await tbodyLocator.waitFor({ state: 'visible', timeout: 10000 });

        // 테이블의 모든 행을 가져오기
        const rows = await tbodyLocator.locator('tr').all();
        const tableData = [];
        let day;
        for (const row of rows) {
            // 각 행의 모든 셀을 가져오기
            const cells = await row.locator('td').all();
            const rowData = {};
            for (const cell of cells) {
                const className = await cell.getAttribute('class'); // 클래스 이름 가져오기
                if (className === 'day') {
                  const extractDay = await cell.textContent()
                  day = convertDate(year, extractDay)

                }else if (className === 'time') {
                  const time = await cell.textContent() 
                  rowData['time'] = day + " " + time 
                }
                else if (className === 'play') {
                  const spans = await cell.locator('span').all();
                  const indicator = await spans[1].textContent();
                  if( indicator !== "vs") {
                    rowData['away_team_name'] = await spans[0].textContent();
                    rowData['away_team_score'] = indicator
                    rowData['home_team_score'] = await spans[3].textContent();
                    rowData['home_team_name'] = await spans[4].textContent();
                  }else{
                    rowData['away_team_name'] = await spans[0].textContent();
                    rowData['home_team_name'] = await spans[2].textContent();
                  }
                }
            }
            if(cells[8]) {
              rowData['note'] = await cells[8].textContent()
            } else {
              rowData['note'] = await cells[7].textContent()
            }
            tableData.push(rowData);
        }

        // JSON으로 출력
        return tableData
    } catch (error) {
        console.error(`테이블 데이터 추출 실패: ${error.message}`);
    }

    // 브라우저를 자동으로 종료하지 않음
    // await browser.close(); // 이 줄을 주석 처리하거나 제거하여 브라우저가 자동으로 종료되지 않도록 합니다.
}

function convertDate(year, dateStr) {
  const regex = /^(\d{2})\.(\d{2})\(.\)$/;
  const match = dateStr.match(regex);
  
  if (match) {
      const month = match[1];
      const day = match[2];
      
      // 결과 문자열을 형식에 맞게 조합합니다.
      const formattedDate = `${year}-${month}-${day}`;
      
      return formattedDate;
  } else {
      throw new Error('Invalid date format');
  }
}
