import threading, time, requests, cProfile

class Request(threading.Thread):
    
    def __init__(self, num_thread):
        super().__init__()
        self.num_thread = num_thread
        
    def run(self):
        print(f'Старт потока №{self.num_thread}')
        for i in range(1000):
        	response = requests.get("http://localhost:8080/test/1")
        	if response.status_code != 200:
        		raise Exception
        print(f'Завершение работы потока №{self.num_thread}')
        print("Время работы: ", time.thread_time())


for i in range(10):
	th = Request(i)
	th.start()