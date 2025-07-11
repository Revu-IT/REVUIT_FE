---
name: "✨Feature"
about: 새로운 기능 추가
title: "[Feat]"
labels: "✨feat"
assignees: ''

---

- type: textarea
    attributes:
      label: 📄 설명
      description: 새로운 기능에 대한 설명을 작성해 주세요.
    validations:
      required: true
  - type: textarea
    attributes:
      label: ✅ 작업할 내용
      description: 할 일을 체크박스 형태로 작성해주세요.
    validations:
      required: true
  - type: textarea
    attributes:
      label: 📚 Remarks
      description: 기능 개발에 있어 비고사항이 있다면 작성해 주세요.
