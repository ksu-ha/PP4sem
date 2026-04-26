import './actionButtons.css';

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="action-btn">Сформировать отчёт</button>
      <button className="action-btn">Создать кейс</button>
      <button className="action-btn">Создать команду</button>
      <button className="action-btn">Перейти к боту</button>
    </div>
  );
};

export default ActionButtons;