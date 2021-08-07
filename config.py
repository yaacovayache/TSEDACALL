import paramiko

def connection_ssh_server():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(hostname='178.18.246.119', username='root', password='St72qiJKmMB3vnuT', port='22')
    return ssh

def get_git_data():
    return {"user": "jeremylzn", "password": "150897Fvaji", "repo": "TSEDACALL"}