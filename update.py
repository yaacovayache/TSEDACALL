import subprocess, sys, os.path
from config import *


try:
    gitadd = subprocess.check_output(["git", "add", "."])
    print(gitadd)
    gitcommit = subprocess.check_output(["git", "commit", "-m", '"update to server"'])
    print(gitcommit)
    gitpush = subprocess.check_output(["git", "push", "https://" + get_git_data()["user"] + ":" + get_git_data()["password"] + "@github.com/" + get_git_data()["user"] + "/" + get_git_data()["repo"] + ".git"])
    print(gitpush)
except Exception as e:
    print(e)

# ssh = connection_ssh_server()
# commands = ["cd /var/www/manager-app ; pwd ; git pull https://" + get_git_data()["user"] + ":" + get_git_data()["password"] + "@github.com/" + get_git_data()["user"] + "/" + get_git_data()["repo"] + ".git ;"]
# for command in commands:
#     print("=" * 50, command, "=" * 50)
#     stdin, stdout, stderr = ssh.exec_command(command)
#     print(stdout.read().decode())
#     err = stderr.read().decode()
#     if err:
#         print(err)