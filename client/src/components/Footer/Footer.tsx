import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="promo">
                    <span className="promo-text">
                        Проверьте нашу кухню и получите  — хватит на две 
                    </span>
                    <button className="promo-button">Заполнить анкету</button>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Mnogosushi</h4>
                    <ul>
                        <li>О нас</li>
                        <li>Mnogosushi-книга</li>
                        <li>Блог «Сила ума»</li>
                        <li>Заявка на спонсорство</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Работа</h4>
                    <ul>
                        <li>В пиццерии</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Партнерам</h4>
                    <ul>
                        <li>Предложить помещение</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Это интересно</h4>
                    <ul>
                        <li>Почему мы готовим без перчаток?</li>
                        <li>Экскурсии и мастер-классы</li>
                    </ul>
                </div>
                <div className="footer-contacts">
                    <div className="phone-number">0 (551) 560-550</div>
                    <div className="contact-info">
                        Звонок по телефону
                        <br />
                        feedback@mnogosushi.kg
                    </div>
                    <div className="payment-methods">
                        <span>Принимаем к оплате</span>
                        <div className="payment-icons">
                            <img src="https://mbank.kg/media/logo/Frame_4.png" alt="Payment method 1" />
                            <img src="https://dengi.kg/assets/bonuses/ru/bonus1701408297.png" alt="Payment method 2" />
                            <img src="https://www.kompanion.kg/image/18a38a28-1518-40b3-9b0c-5b5f49b7e3a4_%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D1%8C%D0%BE%D0%BD.png" alt="Payment method 3" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>Mnogosushi 2023 - 2024 By Codex</span>
                <span>Правовая информация</span>
            </div>
        </footer>
    );
};

export default Footer;
