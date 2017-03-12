(function(){
	function Lang( lang ){
		if(lang == "en"){
			var en = {
				addElement: "Add",
				deleteElement: "Delete",
				copyElement: "Copy",
				pasteElement: "Paste",
				toBackElement: "To back",
				toFrontElement: "To front",
				lockElement: "Lock",
				lockDesc: "Until the element is locked you cannot move and scale it",
				unlockElement: "Unlock",
				settings: "Settings",
				about: "About",
				closePaintMode: "Double click outside element area to disable edit mode",
				textLabel: "Label",
				left: "Left",
				right: "Right",
				center: "Center",
				align: "Align",
				textColor: "Text color",
				border: "Border",
				lineSpace: "Line Spacing",
				insertTextHere: "Insert your text here...",
				rectangle: "Rectangle",
				fill: "Fill",
				alpha: "Transparency",
				image: "Image",
				uploadYourImage: "Upload your own image",
				circle: "Circle",
				bezier: "Bezier",
				painter: "Painter",
				smooth: "Smooth",
				point: "Point",
				doubleClickToDraw: "Double click in area to drawing",
				lineType: "Line type",
				roundCorner: "Rounded corners"
			}
			window.langLD = en;
		}
		else if(lang == "ru"){
			var ru = {
				addElement: "Добавить",
				deleteElement: "Удалить",
				copyElement: "Копировать",
				pasteElement: "Вставить",
				toBackElement: "На задний план",
				toFrontElement: "На передний план",
				lockElement: "Заблокировать",
				lockDesc: "Заблокированный элемент нельзя перемещать и изменять размер",
				unlockElement: "Разблокировать",
				settings: "Настройки",
				about: "О приложении",
				closePaintMode: "Чтобы выйти из режима редактирования, дважды кликните в любой области",
				textLabel: "Надпись",
				left: "По левому краю",
				right: "По правому краю",
				center: "По центру",
				align: "Выравнивание",
				textColor: "Цвет текста",
				border: "Обводка",
				lineSpace: "Междустрочный интервал",
				insertTextHere: "Введите текст...",
				rectangle: "Прямоугольник",
				fill: "Заливка",
				alpha: "Прозрачность",
				image: "Изображение",
				uploadYourImage: "Добавьте ваше изображение",
				circle: "Окружность",
				bezier: "Кривая",
				painter: "Художник",
				smooth: "Гладкая",
				point: "Пунктирная",
				doubleClickToDraw: "Дважды кликните по элементу, чтобы рисовать",
				lineType: "Стиль линии",
				roundCorner: "Сглаживание углов"
			}
			window.langLD = ru;
		}
		
	}
	window.InitialLangLD = Lang;
})();