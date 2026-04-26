// src/pages/Cases/CaseEditPage.tsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import { testCases } from '../../data/cases';
import { SaveIcon, DeleteIcon } from '../../components/common/Icons/Icons';
import './caseEditPage.css';

const CaseEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const caseData = testCases.find(c => c.id === id);
  
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
    customerOrg: 'Альфа-Банк, Департамент малого и среднего бизнеса',
    customerName: 'Кузнецов Дмитрий Андреевич',
    expectedResult: 'Прототип мобильного приложения (iOS/Android) с реализованной скоринговой моделью, возможностью ввода данных по клиенту и формирования заключения о кредитном риске. Результат должен включать техническую документацию и презентацию для руководства.',
    criteria: '1. Корректность работы скоринговой модели (точность предсказания — не менее 80% на тестовых данных).\n2. Удобство интерфейса (время заполнения анкеты — не более 3 минут).\n3. Стабильность работы в офлайн-режиме.\n4. Полнота технической документации.\n5. Качество презентации и защиты решения.',
    programHead: 'Смирнова Елена Викторовна',
    educationProgram: '09.03.04/33.01 Программная инженерия',
    semester: 'Весенний'
  });

  // Функция для ограничения высоты contenteditable элементов
  const setupScrollableEditable = (element: HTMLDivElement | null, maxHeight: number) => {
    if (!element) return;
    
    const checkHeight = () => {
      // Временно убираем ограничение, чтобы получить реальную высоту
      const originalMaxHeight = element.style.maxHeight;
      
      element.style.maxHeight = 'none';
      element.style.overflowY = 'visible';
      
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
    
    // Проверяем при каждом вводе текста
    element.addEventListener('input', checkHeight);
    element.addEventListener('paste', () => setTimeout(checkHeight, 10));
    element.addEventListener('keydown', () => setTimeout(checkHeight, 10));
    
    // Наблюдатель за изменениями DOM
    const observer = new MutationObserver(checkHeight);
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    
    // Первоначальная проверка
    setTimeout(checkHeight, 100);
  };

  useEffect(() => {
    if (caseData) {
      setFormData(prev => ({
        ...prev,
        title: caseData.title,
        description: caseData.description,
        semester: caseData.semester || 'Весенний'
      }));
    }
  }, [caseData]);

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
  };

  const handleSemesterChange = (semester: string) => {
    setFormData(prev => ({ ...prev, semester }));
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', formData);
    navigate(`/cases/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот кейс?')) {
      console.log('Удален кейс:', id);
      navigate('/cases');
    }
  };

  const breadcrumbItems = [
    { label: 'Главная', path: '/' },
    { label: 'Все кейсы', path: '/cases' },
    { label: 'Просмотр кейса', path: `/cases/${id}` },
    { label: 'Редактирование' },
  ];

  if (!caseData) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="not-found">Кейс не найден</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper case-edit-page">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <div className="edit-header">
        <h1 className="page-title">Редактирование кейса</h1>
        <div className="edit-actions">
          <button className="delete-btn" onClick={handleDelete}>
            <DeleteIcon />
            <span>Удалить</span>
          </button>
          <button className="save-btn" onClick={handleSave}>
            <SaveIcon />
            <span>Сохранить</span>
          </button>
        </div>
      </div>

      <div className="edit-form">
        {/* Название кейса */}
        <div className="form-field">
          <label className="form-label">Название кейса</label>
          <div
            ref={titleRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('title', e.currentTarget.innerText)}
          >
            {formData.title}
          </div>
        </div>

        {/* Описание кейса */}
        <div className="form-field">
          <label className="form-label">Описание кейса</label>
          <div
            ref={descriptionRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('description', e.currentTarget.innerText)}
          >
            {formData.description}
          </div>
        </div>

        {/* Организация заказчика */}
        <div className="form-field">
          <label className="form-label">Организация заказчика</label>
          <div
            ref={customerOrgRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('customerOrg', e.currentTarget.innerText)}
          >
            {formData.customerOrg}
          </div>
        </div>

        {/* ФИО заказчика */}
        <div className="form-field">
          <label className="form-label">ФИО заказчика</label>
          <div
            ref={customerNameRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('customerName', e.currentTarget.innerText)}
          >
            {formData.customerName}
          </div>
        </div>

        {/* Предполагаемый результат */}
        <div className="form-field">
          <label className="form-label">Предполагаемый результат</label>
          <div
            ref={expectedResultRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('expectedResult', e.currentTarget.innerText)}
          >
            {formData.expectedResult}
          </div>
        </div>

        {/* Критерии оценки */}
        <div className="form-field">
          <label className="form-label">Критерии оценки</label>
          <div
            ref={criteriaRef}
            className="editable-box criteria-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('criteria', e.currentTarget.innerText)}
          >
            {formData.criteria}
          </div>
        </div>

        {/* Главный руководитель */}
        <div className="form-field">
          <label className="form-label">Главный руководитель образовательной программы</label>
          <div
            ref={programHeadRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('programHead', e.currentTarget.innerText)}
          >
            {formData.programHead}
          </div>
        </div>

        {/* Образовательная программа */}
        <div className="form-field">
          <label className="form-label">Образовательная программа</label>
          <div
            ref={educationProgramRef}
            className="editable-box"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleContentChange('educationProgram', e.currentTarget.innerText)}
          >
            {formData.educationProgram}
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

export default CaseEditPage;