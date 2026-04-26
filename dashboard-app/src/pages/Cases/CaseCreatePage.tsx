// src/pages/Cases/CaseCreatePage.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { SaveIcon, GenerateIcon } from '../../components/common/Icons/Icons';
import './caseCreatePage.css';

const CaseCreatePage = () => {
  const navigate = useNavigate();
  
  // Refs для contentEditable элементов
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const customerOrgRef = useRef<HTMLDivElement>(null);
  const customerNameRef = useRef<HTMLDivElement>(null);
  const expectedResultRef = useRef<HTMLDivElement>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const programHeadRef = useRef<HTMLDivElement>(null);
  const educationProgramRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerOrg: '',
    customerName: '',
    expectedResult: '',
    criteria: '',
    programHead: '',
    educationProgram: '',
    semester: ''
  });

  // Функция для ограничения высоты contenteditable элементов
  const setupScrollableEditable = (element: HTMLDivElement | null, maxHeight: number) => {
    if (!element) return;
    
    const checkHeight = () => {
      const scrollHeight = element.scrollHeight;
      
      if (scrollHeight > maxHeight) {
        element.style.maxHeight = maxHeight + 'px';
        element.style.overflowY = 'auto';
        element.classList.add('with-scroll');
      } else {
        element.style.maxHeight = 'none';
        element.style.overflowY = 'visible';
        element.classList.remove('with-scroll');
      }
    };
    
    element.addEventListener('input', checkHeight);
    element.addEventListener('paste', () => setTimeout(checkHeight, 10));
    element.addEventListener('keydown', () => setTimeout(checkHeight, 10));
    
    const observer = new MutationObserver(checkHeight);
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    
    setTimeout(checkHeight, 100);
  };

  // Настройка скролла для всех полей
  useEffect(() => {
    setupScrollableEditable(titleRef.current, 53.4);
    setupScrollableEditable(descriptionRef.current, 116.4);
    setupScrollableEditable(customerOrgRef.current, 53.4);
    setupScrollableEditable(customerNameRef.current, 53.4);
    setupScrollableEditable(expectedResultRef.current, 95.4);
    setupScrollableEditable(criteriaRef.current, 137.4);
    setupScrollableEditable(programHeadRef.current, 53.4);
    setupScrollableEditable(educationProgramRef.current, 53.4);
  }, []);

  const handleContentChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Убираем класс empty если есть текст
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element && value.trim() !== '') {
      element.classList.remove('empty');
    } else if (element && value.trim() === '') {
      element.classList.add('empty');
    }
  };

  const handleSemesterChange = (semester: string) => {
    setFormData(prev => ({ ...prev, semester }));
  };

  const handleSave = () => {
    console.log('Создан новый кейс:', formData);
    navigate('/cases');
  };

  const handleGenerate = () => {
    console.log('Генерация кейса с помощью AI');
    // TODO: добавить логику генерации
  };

  const breadcrumbItems = [
    { label: 'Главная', path: '/' },
    { label: 'Все кейсы', path: '/cases' },
    { label: 'Создание кейса' },
  ];

  return (
    <div className="page-wrapper case-create-page">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <div className="create-header">
        <h1 className="page-title">Создание кейса</h1>
        <div className="create-actions">
          <button className="generate-btn" onClick={handleGenerate}>
            <GenerateIcon />
            <span>Сгенерировать</span>
          </button>
          <button className="save-btn" onClick={handleSave}>
            <SaveIcon />
            <span>Сохранить</span>
          </button>
        </div>
      </div>

      <div className="create-form">
        {/* Название кейса */}
        <div className="form-field">
          <label className="form-label">Название кейса</label>
          <div
            ref={titleRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('title', e.currentTarget.innerText)}
            data-placeholder="Введите название кейса"
            data-field="title"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Описание кейса */}
        <div className="form-field">
          <label className="form-label">Описание кейса</label>
          <div
            ref={descriptionRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('description', e.currentTarget.innerText)}
            data-placeholder="Введите описание кейса"
            data-field="description"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Организация заказчика */}
        <div className="form-field">
          <label className="form-label">Организация заказчика</label>
          <div
            ref={customerOrgRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('customerOrg', e.currentTarget.innerText)}
            data-placeholder="Введите организацию заказчика"
            data-field="customerOrg"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* ФИО заказчика */}
        <div className="form-field">
          <label className="form-label">ФИО заказчика</label>
          <div
            ref={customerNameRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('customerName', e.currentTarget.innerText)}
            data-placeholder="Введите ФИО заказчика"
            data-field="customerName"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Предполагаемый результат */}
        <div className="form-field">
          <label className="form-label">Предполагаемый результат</label>
          <div
            ref={expectedResultRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('expectedResult', e.currentTarget.innerText)}
            data-placeholder="Введите предполагаемый результат"
            data-field="expectedResult"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Критерии оценки */}
        <div className="form-field">
          <label className="form-label">Критерии оценки</label>
          <div
            ref={criteriaRef}
            className="editable-box criteria-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('criteria', e.currentTarget.innerText)}
            data-placeholder="Введите критерии оценки"
            data-field="criteria"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Главный руководитель */}
        <div className="form-field">
          <label className="form-label">Главный руководитель образовательной программы</label>
          <div
            ref={programHeadRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('programHead', e.currentTarget.innerText)}
            data-placeholder="Введите ФИО руководителя"
            data-field="programHead"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Образовательная программа */}
        <div className="form-field">
          <label className="form-label">Образовательная программа</label>
          <div
            ref={educationProgramRef}
            className="editable-box empty"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('educationProgram', e.currentTarget.innerText)}
            data-placeholder="Введите образовательную программу"
            data-field="educationProgram"
            style={{ minWidth: '100%', width: '100%' }}
          >
          </div>
        </div>

        {/* Семестр */}
        <div className="form-field form-field-row">
          <label className="form-label">Семестр</label>
          <div className="semester-toggle">
            <button
              className={`semester-option ${formData.semester === 'Осенний' ? 'active' : ''}`}
              onClick={() => handleSemesterChange('Осенний')}
            >
              Осенний
            </button>
            <button
              className={`semester-option ${formData.semester === 'Весенний' ? 'active' : ''}`}
              onClick={() => handleSemesterChange('Весенний')}
            >
              Весенний
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCreatePage;