import threading, time, requests, cProfile

class Request_test(threading.Thread):
    
    def __init__(self, request):
        super().__init__()
        self.request = request
        
    def run(self):
        for i in range(1000):
        	try:
        		response = requests.get(self.request)
        	except Exception as e:
        		print(e)

        
        print(f'Завершение работы потока')
        print("Время работы: ", time.thread_time())

th1 = Request_test("http://localhost:8080/test/1")
th1.start()

th2 = Request_test("http://localhost:8080/file/test.pdf")
th2.start()

th3 = Request_test("http://localhost:8080/docs_info/")
th3.start()

th3 = Request_test("http://localhost:8080/")
th3.start()

th4 = Request_test("http://localhost:8080/test/2")
th4.start()

th5 = Request_test("http://localhost:8080/file/test2.pdf")
th5.start()