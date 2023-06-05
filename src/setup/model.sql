
CREATE TABLE posts(
  postId SERIAL PRIMARY KEY,
  category VARCHAR(32) NOT NULL,
	subcategory VARCHAR(32) NOT NULL,
	link TEXT NOT NULL,
	format VARCHAR(10) NOT NULL,
	date VARCHAR(12) NOT NULL,
	time VARCHAR(8) NOT NULL,
	organizator VARCHAR(32) NOT NULL,
	job VARCHAR(20) NOT NULL,
	contact VARCHAR(20) NOT NULL,
	title TEXT NOT NULL,
	content TEXT NOT NULL,
	image VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT null,
  deleted_at TIMESTAMP DEFAULT null,
	status VARCHAR(20) NOT NULL
);

INSERT INTO posts(category, subcategory, link, format, date, time, organizator, job, contact, title, content, image, status) VALUES ('IT', 'NodeJs', 'https://www.youtube.come', 'Offline', '13/06/2023', '17:00', 'Ochilov Akrom', 'Student', '+998946091300', 'NodeJs kirish', 'Qiziqarli boladi kelila', 'jom.jpeg', 'waiting');

CREATE TABLE admins(
  adminId SERIAL PRIMARY KEY,
  username VARCHAR(32),
  password TEXT,
  avatar VARCHAR(50)
);

INSERT INTO admins(username, password, avatar) VALUES ('akromakrom', '6057110b62338214709dcce8a80306e5cc8b47b9e9fda2b86672e7de13aa8da2', 'akrom.jpeg');